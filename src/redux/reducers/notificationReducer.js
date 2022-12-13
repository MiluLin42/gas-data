import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errMessage: null,
  showSuccess: false,
  successMessage: null,
  showWarning: false,
};

export const notificationReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setErrMessage: (state, action) => {
      if (action.payload) {
        if (action.payload.includes("username is duplicated")) {
          state.errMessage = "此帳號已被使用";
          return;
        }
        if (action.payload.includes("oldPassword is wrong")) {
          state.errMessage = "原密碼輸入錯誤";
          return;
        }
        if (action.payload.includes("password is wrong")) {
          state.errMessage = "密碼錯誤";
          return;
        }
        if (action.payload.includes("username does not exist")) {
          state.errMessage = "帳號錯誤";
          return;
        }
        state.errMessage = action.payload;
        return;
      }
      state.errMessage = action.payload;
    },
    setShowSuccess: (state, action) => {
      state.showSuccess = action.payload.status;
      state.successMessage = action.payload.content || "更新成功";
    },
    setShowWarning: (state, action) => {
      state.showWarning = action.payload;
    },
  },
});

export const { setErrMessage, setShowSuccess, setShowWarning } =
  notificationReducer.actions;

export const setErrorMessage = (content) => (dispatch) => {
  dispatch(setErrMessage(content));
};

export const setShowSuccessNotification = (status, content) => (dispatch) => {
  dispatch(setShowSuccess({ status, content }));
};

export const setShowWarningNotification = (status) => (dispatch) => {
  dispatch(setShowWarning(status));
};

export const selectErrMessage = (state) => state.notifications.errMessage;
export const selectShowWarning = (state) => state.notifications.showWarning;

export default notificationReducer.reducer;
