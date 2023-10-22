import React, {useEffect, useState} from "react";
import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from "../plugins/redux/action";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [notRobot, setNotRobot] = useState(true);
    const [isValid, setValid] = useState(false);
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate();


    // start redux
    const {userToken,loading, error} = useSelector(
        (state) => state.content
    )
    const dispatch = useDispatch()
    // end redux

    //lifeCycle
    useEffect(() => {
        let cleanUp = true
        if (cleanUp) {
            isValidEmailAndPass(email, pass)
        }
        return () => {
            cleanUp = false
        }
    }, [pass, email]);

    function isValidEmailAndPass(email, pass) {
        let isValidEmail = /\S+@\S+\.\S+/.test(email)
        let isValidPass = /[A-Za-z0-9]/.test(pass)
        if (isValidEmail && isValidPass) {
            setValid(false)
        } else {
            setValid(true)
        }
    }
    async function submitLogin() {
        //This code if use Redux
        await loginUser(dispatch, {email, pass}).then(()=>navigate("/"))
        if (!userToken) {
            setFailed(true)
            setNotRobot(false)
            setPass("")
        }
    }
    if (loading) {
        return 'loading...'
    }

    return (
        <Card>
            <h3>Login</h3>
            <Input
                data-testid="email"
                label="✉️ Email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <Input
                data-testid="password"
                label="🔑 Password"
                type="password"
                value={pass}
                onChange={(e) => {
                    setPass(e.target.value)
                }}
            />
            {failed && <NotRobot checked={notRobot} onChange={() => {
                setNotRobot(!notRobot)
            }}/>}
            {failed && <ErrorMessage/>}

            <LoginButton onClick={async () => {
                await submitLogin()
            }} disabled={!notRobot || isValid}/>
        </Card>
    );
};

export default Login;
