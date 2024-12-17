// eventThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";

interface Event {
  id: number;
  status: string;
  created_at: string;
  submitted_at: string;
  completed_at: string | null;
  classrooms: Array<any>;
}

export const fetchEvents = createAsyncThunk<Event[], void, { rejectValue: string }>(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.events.eventsSearchList();
      if (response.status === 200) {
        return response.data as Event[];
      } else {
        return rejectWithValue("Ошибка при загрузке мероприятий");
      }
    } catch (err) {
      console.error("Ошибка при загрузке мероприятий:", err);
      return rejectWithValue("Ошибка при загрузке мероприятий");
    }
  }
);
