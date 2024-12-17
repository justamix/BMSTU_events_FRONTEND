import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { T_Classroom } from "src/modules/types";

export const fetchClassroomById = createAsyncThunk<T_Classroom, string, { rejectValue: string }>(
  "classroom/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.classrooms.classroomsRead(id);
      return response.data as T_Classroom;
    } catch (error) {
      console.error("Ошибка при получении данных аудитории:", error);
      return rejectWithValue("Не удалось загрузить данные аудитории.");
    }
  }
);
