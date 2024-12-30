import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { removeCartItem, resetCartCount, setCartCount } from "src/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "src/store"; 
// Thunk для удаления аудитории из корзины
export const deleteClassroomFromCart = createAsyncThunk<
  void,
  { eventId: number; classroomId: number },
  { rejectValue: string }
>("cart/deleteClassroom", async ({ eventId, classroomId }, { dispatch, getState, rejectWithValue }) => {
  try {
    const response = await api.events.eventsDeleteClassroomDelete(String(eventId), String(classroomId));
    if (response.status === 200 || response.status === 204) {
      const state = getState() as RootState; // Получаем текущее состояние
      const currentCount = state.classrooms_count.classroomsCount; // Текущее значение счетчика
      dispatch(removeCartItem(classroomId));
      dispatch(setCartCount(currentCount - 1)); // Уменьшаем счетчик на 1
    } else {
      return rejectWithValue("Ошибка при удалении аудитории из корзины.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при удалении аудитории из корзины.");
  }
});

// Thunk для удаления всей корзины
export const deleteCart = createAsyncThunk<
  void,
  { eventId: number },
  { rejectValue: string }
>("cart/deleteCart", async ({ eventId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.events.eventsDeleteDelete(String(eventId));

    if (response.status === 200) {
      dispatch(resetCartCount()); // Сбрасываем состояние корзины
    } else {
      return rejectWithValue("Ошибка при удалении корзины.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при удалении корзины.");
  }
});

// Thunk для оформления заказа
export const submitOrder = createAsyncThunk<
  void,
  { eventId: number },
  { rejectValue: string }
>("cart/submitOrder", async ({ eventId }, { rejectWithValue }) => {
  try {
    const response = await api.events.eventsUpdateStatusUserUpdate(String(eventId));

    if (response.status !== 200) {
      return rejectWithValue("Ошибка при оформлении заказа.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при оформлении заказа.");
  }
});
