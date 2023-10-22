import {fetchLoading, fetchLogin, fetchLogout, userReceived} from "./contentSlice";
import {axiosInstance} from "../axios";


const serverURL = 'http://127.0.0.1:4000/api';

async function login(email, password) {
    const body = {email: email, password: password}
    return await axiosInstance.post(`${serverURL}/login`, body)
}

async function postRequest(url, body, token) {
    const config = {headers: {'jwt': token.access}}
    return await axiosInstance.post(`${serverURL}/${url}`, body, config)
}

async function logout(body) {
    return await axiosInstance.delete(`${serverURL}/logout`, body)
}

const loginUser = async (dispatch, {email, pass}) => {
    dispatch(fetchLoading())
    const response = await login(email, pass)
    dispatch(fetchLogin({response, email}))
}

const getInfoUser = async (dispatch, {url, email}, token) => {
    dispatch(fetchLoading())
    const body = {email}
    const response = await postRequest(url, body, token)
    dispatch(userReceived(response))
}
const logoutUser = async (dispatch, token) => {
    dispatch(fetchLoading())
    const body = {data: {'token': token.refresh}}
    await logout(body)
    dispatch(fetchLogout())
}
export {logoutUser, getInfoUser, loginUser}
