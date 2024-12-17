import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchClassrooms } from "src/thunks/classroomsThunk";

interface CartClassroom {
  classroom_id: number;
  name: string;
  address: string;
}

interface CartState {
  classroomsCount: number;
  draftId: string | null;
  cartItems: CartClassroom[];
  classrooms: CartClassroom[]; // Список всех аудиторий
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  classroomsCount: 0,
  draftId: null,
  cartItems: [],
  classrooms: [],
  loading: false,
  error: null,
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
      state.cartItems = [];
    },
    setDraftId: (state, action: PayloadAction<string>) => {
      state.draftId = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartClassroom[]>) => {
      state.cartItems = action.payload;
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.classroom_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassrooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload; // Сохраняем аудиторий
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCartCount, resetCartCount, setDraftId, setCartItems, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
