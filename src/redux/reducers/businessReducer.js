import { createSlice } from "@reduxjs/toolkit";
import {
  getBusinesses as getBusinessesApi,
  getBusinessesById as getBusinessesByIdApi,
  searchBusiness as searchBusinessApi,
  postBusiness as postBusinessApi,
  updateBusiness as updateBusinessApi,
} from "../../WebAPI/businessAPI";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";
const initialState = {
  totalPages: 1,
  sort: "id",
  businesses: [],
  business: [],
  errorMessage: null,
  isLoading: false,
};

export const businessReducer = createSlice({
  name: "business",
  initialState,
  reducers: {
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setBusinesses: (state, action) => {
      state.businesses = action.payload;
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
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
  setBusinesses,
  setBusiness,
  setErrMessage,
  setIsLoading,
} = businessReducer.actions;

export const getBusinesses = (queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true));
  getBusinessesApi(queryParameters).then((res) => {
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
    dispatch(setBusinesses(res.data.rows));
    dispatch(setIsLoading(false));
  });
};

export const cleanBusinesses = () => (dispatch) => {
  dispatch(setBusinesses([]));
};

export const getBusiness = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getBusinessesByIdApi(id)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"));
      }
      return res.data;
    })
    .then((business) => {
      dispatch(setIsLoading(false));
      if (business === null) return dispatch(setBusiness(0));
      dispatch(setBusiness(business));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cleanBusiness = () => (dispatch) => {
  dispatch(setBusiness([]));
};

export const searchBusiness = (keyword, queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true));
  return searchBusinessApi(keyword, queryParameters)
    .then((res) => {
      dispatch(setIsLoading(false));
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"));
      }
      return res.data;
    })
    .then((businesses) => {
      dispatch(setBusinesses(businesses));
    })
    .catch((err) => console.log(err));
};

export const postBusiness =
  ({ telephone, cellphone, store_name, store_address, remark, price }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return postBusinessApi({
      telephone,
      cellphone,
      store_name,
      store_address,
      remark,
      price,
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

export const updateBusiness =
  (id, { telephone, cellphone, store_name, store_address, remark, price }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return updateBusinessApi(id, {
      telephone,
      cellphone,
      store_name,
      store_address,
      remark,
      price,
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

export const selectBusiness = (state) => state.business.business;
export const selectBusinesses = (state) => state.business.businesses;
export const selectTotalPages = (state) => state.business.totalPages;
export const selectIsLoading = (state) => state.business.isLoading;

export default businessReducer.reducer;
