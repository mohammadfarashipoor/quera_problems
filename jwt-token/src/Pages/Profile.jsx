import React, {useEffect} from "react";

import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import {useNavigate} from "react-router-dom";
import useJWT from "../Hooks/useJWT";

const Profile = () => {
    const initialUser = {name: "", lastname: "", phone: "", address: "", email: "", password: ""}
    const [user, setUser] = React.useState(initialUser);
    const {logout, sendPostRequest} = useJWT()
    const navigate = useNavigate();

    useEffect( async () => {
            if (!localStorage.getItem('access')) {
                navigate("/login")
            } else {
                const user = {'email': localStorage.getItem('email')}
                await sendPostRequest('http://127.0.0.1:4000/api/user', user).then((res)=>{
                    setUser(res?.data?.user)
                })
            }
    }, [])


    return (
        <div className="container">
            <Row>
                <UserData label="Name">{user.name}</UserData>
                <UserData label="Family">{user.lastname}</UserData>
            </Row>

            <Row>
                <UserData label="Phone">{user.phone}</UserData>
                <UserData label="Address">{user.address}</UserData>
            </Row>

            <Row>
                <UserData label="Email">{user.email}</UserData>
                <UserData label="Password">{user.password}</UserData>
            </Row>

            <LogoutButton onClick={async () => {
                await logout()
            }}/>
        </div>
    );
};

export default Profile;
