import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    userInfo: {name: "", lastname: "", phone: "", address: "", email: "", password: ""}, // for user object
    userToken: null, // for storing the JWT
}


const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        fetchLoading(state, action) {
            if (!state.loading) {
                state.loading = true
            }
        },
        fetchLogin(state, {payload}) {
            if (state.loading) {
                state.loading = false
                const {response, email} = payload
                state.userToken = response
                state.userInfo = {...state.userInfo, email}
            }
        },
        fetchLogout(state, {payload}) {
            if (state.loading) {
                state.userInfo = initialState.userInfo;
                state.userToken = initialState.userToken;
                state.loading = initialState.loading;
            }
        },
        userReceived(state, {payload}) {
            if (state.loading) {
                state.userInfo = payload.user;
                state.loading = false
            }
        },
    },

})
export const {fetchLoading, userReceived, fetchLogin,fetchLogout} = contentSlice.actions

export default contentSlice.reducer