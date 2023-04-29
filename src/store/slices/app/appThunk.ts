// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {AxiosError} from "axios";
// import {AsyncThunkType} from "@/redux/store";
// import {s_adminApi} from "@/api/s_adminApi";
// import {checkAuth} from "@/redux/slices/auth/authThunk";
// import {adminApi} from "@/api/adminApi";
// import {setDataSAdmin} from "@/redux/slices/s_admin/s_adminSlice";
// import {setDataAdmin} from "@/redux/slices/admin/adminSlice";
//
//
// export const getUserData = createAsyncThunk<undefined, undefined,AsyncThunkType>(
//     'app/getUserData',
//     async (data, thunkAPI) => {
//         try {
//
//             if (localStorage.getItem("accessToken")) {
//                 await thunkAPI.dispatch(checkAuth())
//             }
//
//             const auth = thunkAPI.getState().auth;
//
//             if (auth.role === "S_ADMIN") {
//
//                 const response = await s_adminApi.getSAdminUser(auth.id);
//                 thunkAPI.dispatch(setDataSAdmin(response));
//
//             } else {
//
//                 const response = await adminApi.getAdminUser(auth.id);
//                 thunkAPI.dispatch(setDataAdmin(response));
//
//             }
//         }catch(err: any | AxiosError) {
//
//             return thunkAPI.rejectWithValue({message: 'что-то пошло не так'});
//         }
//     }
// )

export default {};
