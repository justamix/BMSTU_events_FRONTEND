import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartClassroom {
  classroom_id: number;
  name: string;
  address: string;
}

interface CartState {
  classroomsCount: number;
  draftId: string | null; // ID черновика
  cartItems: CartClassroom[]; // Список элементов корзины
}

const initialState: CartState = {
  classroomsCount: 0,
  draftId: null,
  cartItems: [], // Изначально корзина пуста
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.classroomsCount = action.payload;
    },
    resetCartCount: (state) => {
      state.classroomsCount = 0;
      state.draftId = null;
      state.cartItems = []; // Сбрасываем корзину
    },
    setDraftId: (state, action: PayloadAction<string>) => {
      state.draftId = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartClassroom[]>) => {
      state.cartItems = action.payload; // Устанавливаем элементы корзины
    },
    removeCartItem(state, action: PayloadAction<number>) {
      console.log("Удаление элемента с ID:", action.payload);
      console.log("Состояние до удаления:", state.cartItems);
      state.cartItems = state.cartItems.filter(
        (item) => item.classroom_id !== action.payload
      );
      console.log("Состояние после удаления:", state.cartItems);
    }
  },
});

export const {
  setCartCount,
  resetCartCount,
  setDraftId,
  setCartItems,
  removeCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
