import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import memberReducer from "./reducers/memberReducer";
import businessReducer from "./reducers/businessReducer";
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
  reducer: {
    users: userReducer,
    member: memberReducer,
    business: businessReducer,
    notifications: notificationReducer,
  },
});
