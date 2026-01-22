import { CartStoreActionsType } from "./../types";
import { create } from "zustand";
import { CartStoreStateType } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated:false,
      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(p=>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
          )

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart]
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return {cart: updatedCart};
          }
          return {
            cart: [
              ...state.cart,
              {
                ...product,
<<<<<<< HEAD
                quantity: product.quantity || 1,
=======
                quantity:1,
>>>>>>> eb26e67de2bf53982a88c314700a89d25f93a6f6
                selectedSize:product.selectedSize,
                selectedColor:product.selectedColor,
              }
            ]
          }
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((p) => !(
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
          )),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: ()=> (state)=>{
        if (state) {
          state.hasHydrated = true;
        }
      }
    },
  ),
);

export default useCartStore;
