import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { setCartCount, setDraftId, setCartItems } from "src/slices/cartSlice";

// Создаем Thunk для загрузки аудиторий
export const fetchClassrooms = createAsyncThunk(
  "classrooms/fetchClassrooms",
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.classrooms.classroomsSearchList({ name });
      const data = response.data;

      // Обновляем состояние через другие экшены
      dispatch(setCartCount(data.classrooms_count || 0));
      dispatch(setDraftId(data.draft_event || null));
      dispatch(setCartItems(data.draft_classrooms || []));

      return data.classrooms; // Возвращаем список аудиторий
    } catch (error) {
      console.error("Ошибка при загрузке аудиторий:", error);
      return rejectWithValue("Не удалось загрузить данные аудиторий");
    }
  }
);
