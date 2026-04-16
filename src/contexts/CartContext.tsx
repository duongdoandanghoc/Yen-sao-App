"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { CartItem, ProductType } from "@/types";

// Cart data version - increment when ProductType schema changes
const CART_VERSION = 2;
const CART_STORAGE_KEY = "yensao-cart";
const CART_VERSION_KEY = "yensao-cart-version";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: ProductType; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

/**
 * Validate that a product ID is a valid MongoDB ObjectId (24 hex chars).
 * This prevents old mockData IDs like "product-X" from causing checkout errors.
 */
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Validate and filter cart items, removing any with invalid/stale data.
 */
function validateCartItems(items: CartItem[]): CartItem[] {
  return items.filter((item) => {
    // Must have a product with valid ObjectId
    if (!item.product?.id || !isValidObjectId(item.product.id)) {
      return false;
    }
    // Must have required fields
    if (!item.product.name || !item.product.slug || typeof item.product.price !== "number") {
      return false;
    }
    // Must have valid quantity
    if (!item.quantity || item.quantity < 1) {
      return false;
    }
    return true;
  });
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (action.quantity || 1),
        };
        return { ...state, items: newItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity || 1 }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "LOAD_CART":
      return { ...state, items: action.items };

    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductType, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage on mount with version check and validation
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem(CART_VERSION_KEY);
      const saved = localStorage.getItem(CART_STORAGE_KEY);

      // If version mismatch, clear old cart data
      if (savedVersion !== String(CART_VERSION)) {
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.setItem(CART_VERSION_KEY, String(CART_VERSION));
        return;
      }

      if (saved) {
        const rawItems = JSON.parse(saved);
        // Validate and filter items - removes any with invalid ObjectIds
        const validItems = validateCartItems(rawItems);

        // If some items were invalid, we'll just load the valid ones
        if (validItems.length !== rawItems.length) {
          console.warn(
            `Giỏ hàng: loại bỏ ${rawItems.length - validItems.length} sản phẩm không hợp lệ (dữ liệu cũ).`
          );
        }

        dispatch({ type: "LOAD_CART", items: validItems });
      }
    } catch {
      // If localStorage is corrupted, just start fresh
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.setItem(CART_VERSION_KEY, String(CART_VERSION));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    localStorage.setItem(CART_VERSION_KEY, String(CART_VERSION));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value: CartContextType = {
    items: state.items,
    isOpen: state.isOpen,
    addItem: (product, quantity) => dispatch({ type: "ADD_ITEM", product, quantity }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
