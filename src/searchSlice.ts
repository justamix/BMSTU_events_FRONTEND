import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    classroomName: string;
}

const initialState: SearchState = {
    classroomName: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setClassroomName(state, action: PayloadAction<string>) {
            state.classroomName = action.payload;
        },
    },
});

export const { setClassroomName } = searchSlice.actions;
export default searchSlice.reducer;
