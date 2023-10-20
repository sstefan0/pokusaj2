import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CounterState {
  user: User | null;
}

const initialState: CounterState = {
  user: null,
};
export const signIn = createAsyncThunk<User, FieldValues>(
  "account/signIn",
  async (arg, thunkAPI) => {
    try {
      const user = await agent.Auth.login(arg);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Došlo je do greške");
    }
  }
);
export const currentUser = createAsyncThunk<User>(
  "account/currentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Auth.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Došlo je do greške");
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, currentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;

      
        
      }
    );
    builder.addMatcher(
      isAnyOf(signIn.rejected, currentUser.rejected),
      (state, action) => {
        toast.error("Pogresno korisnicko ime ili lozinka");
        state.user = null;
        localStorage.removeItem("user");
      }
    );
  },
});
export const { setUser, deleteUser } = accountSlice.actions;
