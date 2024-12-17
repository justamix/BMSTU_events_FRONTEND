import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api"; // Ваш API-клиент
import { setUser } from "src/slices/userSlice";

interface EditUserPayload {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string; // Опционально, если меняется пароль
}

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData: EditUserPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.users.usersUpdateUpdate(formData);

      if (response.status === 200) {
        dispatch(setUser(response.data)); // Обновляем Store с новыми данными пользователя
        return response.data;
      } else {
        return rejectWithValue("Ошибка при обновлении данных пользователя.");
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
      return rejectWithValue("Ошибка на сервере.");
    }
  }
);
