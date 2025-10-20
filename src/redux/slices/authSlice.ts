import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  _id: string;
  name: string;
  role: string;
};

type LoginApiResponse = {
	user: UserState;
	token: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: UserState | null;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
		setCredentials: (state, action: PayloadAction<LoginApiResponse>) => {
			const { token, user } = action.payload;
			state.isAuthenticated = action.payload !== null;
			state.token = token;
			state.user = user;
		},
		userLogout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.user = null;
		},
	},
});

export const { setCredentials, userLogout } = authSlice.actions;

export default authSlice.reducer;