import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: Date;
    // Дополнительные поля, которые есть в UserSerializer
  } | null;
  isAuthenticated: boolean;
  color: string; // Новый параметр для цвета
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  color: "", // Начальное значение цвета
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (!state.color) {
        state.color = getRandomColor(); // Устанавливаем цвет, если его еще нет
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.color = ""; 
    },
    changeColor: (state) => {
      state.color = getRandomColor(); // Генерируем новый случайный цвет
    },
  },
});

export const { setUser, logoutUser, changeColor } = userSlice.actions;
export default userSlice.reducer;
// Генерация случайного цвета
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}