// import {
//     RematchDispatch,
//     RematchRootState,
//     createModel,
//     init,
// } from "@rematch/core";
// import { RootModel } from ".";

// export const user = createModel<RootModel>()({
//     state: {
//         isLoggedIn: false,
//         jwtToken: "",
//     },
//     reducers: {
//         login(state) {
//             return { ...state, isLoggedIn: true };
//         },
//         setJwtToken(state, token: string) {
//             return { ...state, jwtToken: token };
//         },
//     },
//     effects: (dispatch) => ({
//         async loginAsync() {
//             dispatch.user.login();
//         },
//         async setJwtTokenAsync(payload) {
//             dispatch.user.setJwtToken(payload);
//         },
//     }),
// });

// export const store = init({
//     models,
// });
// export type Store = typeof store;
// export type Dispatch = RematchDispatch<RootModel>;
// export type RootState = RematchRootState<RootModel>;
