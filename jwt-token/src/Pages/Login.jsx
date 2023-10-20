import React, {useEffect, useState} from "react";
import useJWT from '../Hooks/useJWT'
import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [notRobot, setNotRobot] = useState(true);
    const [isValid, setValid] = useState(false);
    const [failed, setFailed] = useState(false);
    const {login} = useJWT()
    useEffect(() => {
        let cleanUp = true
        if (cleanUp){
            isValidEmailAndPass(email, pass)
        }
        return () => {
            cleanUp=false
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
        let res = await login(email, pass)
        if (!res?.data) {
            setFailed(true)
            setNotRobot(false)
            setPass("")
        }
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
            }} disabled={ !notRobot || isValid}/>
        </Card>
    );
};

export default Login;
