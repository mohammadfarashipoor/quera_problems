import React, {useEffect} from "react";
import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getInfoUser, logoutUser} from "../plugins/redux/action";

const Profile = () => {
    const navigate = useNavigate();

    // start redux
    const {userToken, loading, userInfo, error} = useSelector(
        (state) => state.content
    )
    const dispatchInfoUser = useDispatch()
    const dispatchLogout = useDispatch()

    // end redux


    //lifeCycle
    useEffect(async () => {
        if (!userToken) {
            navigate("/login")
        } else {
            await getInfoUser(dispatchInfoUser, {
                url: 'user',
                email: userInfo.email
            }, userToken)
        }
    }, [])
    if (loading) {
        return 'loading...'
    }

    return (

        <div className="container">
            <Row>
                <UserData label="Name">{userInfo.name}</UserData>
                <UserData label="Family">{userInfo.lastname}</UserData>
            </Row>

            <Row>
                <UserData label="Phone">{userInfo.phone}</UserData>
                <UserData label="Address">{userInfo.address}</UserData>
            </Row>

            <Row>
                <UserData label="Email">{userInfo.email}</UserData>
                <UserData label="Password">{userInfo.password}</UserData>
            </Row>
            <LogoutButton onClick={async () => {
                await logoutUser(dispatchLogout,userToken).then(()=>navigate("/login"))
            }}/>
        </div>


    );
};

export default Profile;
