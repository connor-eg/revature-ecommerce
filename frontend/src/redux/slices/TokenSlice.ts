import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface TokenState {
    token: string
}

const initialState: TokenState = {
    token: ""
}

export const TokenSlice = createSlice({
    name: "token",
    initialState: initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        reset: (state) => {
            state.token = initialState.token;
        }
    }
});

export const { set, reset } = TokenSlice.actions;

export default TokenSlice.reducer;