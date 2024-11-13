import { configureStore } from "@reduxjs/toolkit";
import UserLoginReducer  from "./Users/LoginUser";
import UserRegisterReducer  from "./Users/RegisterUser";
import GetOrganizationsReducer  from "./AllResurces/GetOrganization";

export const store = configureStore({
    reducer: {
        Login: UserLoginReducer,
        Register : UserRegisterReducer,
        AllOrganizations: GetOrganizationsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;