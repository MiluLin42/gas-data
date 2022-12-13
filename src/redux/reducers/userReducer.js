import { createSlice } from "@reduxjs/toolkit";
import {
  register as registerApi,
  login as loginApi,
  getMe as getMeApi,
  updatePassword as updatePasswordApi,
} from "../../WebAPI/userAPI";
import { setAuthToken } from "../../utils/auth";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";
const initialState = {
  user: null,
  isLoading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setIsLoading } = userReducer.actions;

export const register =
  ({ username, password }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return registerApi({
      username,
      password,
    }).then((res) => {
      if (!res.ok) {
        setAuthToken("");
        dispatch(setIsLoading(false));
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setAuthToken(res.token);
      return getMeApi().then((res) => {
        if (!res.ok) {
          setAuthToken("");
          dispatch(setIsLoading(false));
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setIsLoading(false));
        dispatch(setShowSuccessNotification(true, "註冊、登入成功！"));
        dispatch(setUser(res.data));
        return res.data;
      });
    });
  };

export const login = (username, password) => (dispatch) => {
  dispatch(setIsLoading(true));
  return loginApi(username, password).then((res) => {
    if (!res.ok) {
      setAuthToken("");
      dispatch(setIsLoading(false));
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    setAuthToken(res.token);
    dispatch(setShowSuccessNotification(true, "登入成功！"));
    return getMeApi().then((res) => {
      if (!res.ok) {
        setAuthToken("");
        dispatch(setIsLoading(false));
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setIsLoading(false));
      dispatch(setUser(res.data));
      return res.data;
    });
  });
};

export const logout = () => (dispatch) => {
  dispatch(setUser("non-login"));
  setAuthToken("");
};

export const getMe = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return getMeApi().then((res) => {
    if (!res.ok) {
      if (res.message === "non-login") {
        dispatch(setIsLoading(false));
        dispatch(setUser("non-login"));
        return;
      }
      dispatch(setIsLoading(false));
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setIsLoading(false));
    dispatch(setUser(res.data));
  });
};

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => (dispatch) => {
    dispatch(setIsLoading(true));
    return updatePasswordApi(oldPassword, newPassword, confirmPassword).then(
      (res) => {
        if (!res.ok) {
          dispatch(setIsLoading(false));
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return res;
        }
        dispatch(setIsLoading(false));
        dispatch(setShowSuccessNotification(true));
        return res;
      }
    );
  };

export const selectUser = (state) => state.users.user;
export const selectIsLoading = (state) => state.users.isLoading;

export default userReducer.reducer;
