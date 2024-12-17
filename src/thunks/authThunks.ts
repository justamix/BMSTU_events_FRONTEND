import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "src/slices/userSlice";
import { setCookie } from "src/slices/cookieSlice";
import { api } from "src/api"; // Ваш API клиент

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: { username: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.users.usersLoginCreate(formData, { credentials: "include" }); // Вызов API с передачей куки

      // Проверка успешности запроса
      if (response.status === 200 || response.status === 201) {
        const data = response.data;

        alert(data);
        alert(document.cookie);
        // Получаем session_id из cookies
        const sessionId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("session_id="))
          ?.split("=")[1];

        alert(sessionId);

        if (sessionId) {
          dispatch(setCookie(sessionId)); // Сохранение session_id в Redux
          dispatch(setUser(data.user)); // Сохранение информации о пользователе
          return data.user; // Возвращаем данные пользователя
        } else {
          return rejectWithValue("Session ID не найден");
        }
      } else {
        return rejectWithValue(response.data?.error || "Ошибка входа");
      }
    } catch (error) {
      console.error("Ошибка при логине:", error);
      return rejectWithValue("Ошибка при логине");
    }
  }
);

