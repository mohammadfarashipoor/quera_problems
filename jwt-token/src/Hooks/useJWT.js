import axios from "axios";
import {useNavigate} from "react-router-dom";

function useJWT() {
    const navigate = useNavigate();
    const refreshToken = async () => {
        let res = {}
        const refreshToken = localStorage.getItem('refresh')
        const body = {'token': refreshToken}
        await axios.post('http://127.0.0.1:4000/api/token', body).then((response) => {
                localStorage.setItem('access', response?.data?.access)
                localStorage.setItem('refresh', response?.data?.refresh)
                navigate("/")
                res = response
            }
        ).catch((e) => {
            console.log(e)
        })
        return res
    };

    async function login(email, password) {
        let res = {}
        const body = {email: email, password: password}
        await axios.post('http://127.0.0.1:4000/api/login', body).then((response) => {
            localStorage.setItem('access', response?.data?.access)
            localStorage.setItem('refresh', response?.data?.refresh)
            localStorage.setItem('email', email)
            navigate("/")
            res = response
        }).catch((e) => {
            console.log(e)
        })
        return res;
    }

    const sendPostRequest = async (url, data) => {
        const accessToken = localStorage.getItem('access')

        let res = {}
        const config = {headers: {'jwt': accessToken}}
        await axios.post(url, data, config).then(response => {
            res = response
        }).catch(async (e) => {
            if (e?.response?.status === 403) {
                await refreshToken()
                res = await sendPostRequest(url,data)
            }else{
            console.log("else",e)}
        })
        return res;
    };

    const logout = async () => {
        let res = {}
        const refreshToken = localStorage.getItem('refresh')
        await axios.delete('http://127.0.0.1:4000/api/logout', {data: {'token': refreshToken}}).then((response) => {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                navigate("/login")
                res = response;
            }
        ).catch((e) => {
            console.log(e)
        })
        return res;
    };


    return {
        login,
        logout,
        refreshToken,
        sendPostRequest,
    };
}

export default useJWT;
