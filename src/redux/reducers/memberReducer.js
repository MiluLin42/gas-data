import { createSlice } from "@reduxjs/toolkit";
import {
  getMembers as getMembersApi,
  getMembersById as getMembersByIdApi,
  searchMember as searchMemberApi,
  postMember as postMemberApi,
  updateMember as updateMemberApi,
} from "../../WebAPI/memberAPI";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";
const initialState = {
  totalPages: 1,
  sort: "id",
  members: [],
  member: [],
  errorMessage: null,
  isLoading: false,
};

export const memberReducer = createSlice({
  name: "member",
  initialState,
  reducers: {
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    setErrMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTotalPages,
  setMembers,
  setMember,
  setErrMessage,
  setIsLoading,
} = memberReducer.actions;

export const getMembers = (queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true));
  getMembersApi(queryParameters).then((res) => {
    if (!res.ok) {
      dispatch(setIsLoading(false));
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    if (res.data.count === 0) {
      dispatch(setTotalPages(1));
    } else {
      dispatch(setTotalPages(Math.ceil(res.data.count / 10)));
    }
    dispatch(setMembers(res.data.rows));
    dispatch(setIsLoading(false));
  });
};

export const cleanMembers = () => (dispatch) => {
  dispatch(setMembers([]));
};

export const getMember = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getMembersByIdApi(id)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"));
      }
      return res.data;
    })
    .then((member) => {
      dispatch(setIsLoading(false));
      if (member === null) return dispatch(setMember(0));
      dispatch(setMember(member));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cleanMember = () => (dispatch) => {
  dispatch(setMember([]));
};

export const searchMembers = (keyword, queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true));
  return searchMemberApi(keyword, queryParameters)
    .then((res) => {
      dispatch(setIsLoading(false));
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"));
      }
      return res.data;
    })
    .then((members) => {
      dispatch(setMembers(members));
    })
    .catch((err) => console.log(err));
};

export const postMember =
  ({ telephone, cellphone, address, remark, frequency, isRequest }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return postMemberApi({
      telephone,
      cellphone,
      address,
      remark,
      frequency,
      isRequest,
    }).then((res) => {
      dispatch(setIsLoading(false));

      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true, "新增成功！"));
      return res;
    });
  };

export const updateMember =
  (id, { telephone, cellphone, address, remark, frequency, isRequest }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return updateMemberApi(id, {
      telephone,
      cellphone,
      address,
      remark,
      frequency,
      isRequest,
    }).then((res) => {
      dispatch(setIsLoading(false));
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true, "更新成功！"));
      return res;
    });
  };

export const selectMembers = (state) => state.member.members;
export const selectMember = (state) => state.member.member;
export const selectTotalPages = (state) => state.member.totalPages;
export const selectIsLoading = (state) => state.member.isLoading;

export default memberReducer.reducer;
