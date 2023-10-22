import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

import "./App.css";
import ProfileAdvance from "./Pages/ProfileAdvance";
import LoginAdvance from "./Pages/LoginAdvance";

function App() {
	return (
		<BrowserRouter>
			{/*use custome Hook*/}
			{/*<Routes>*/}
			{/*	<Route path="/" element={<Profile />} />*/}
			{/*	<Route path="/login" element={<Login />} />*/}
			{/*</Routes>*/}

			{/*use Redax and axios instance*/}
			<Routes>
				<Route path="/" element={<ProfileAdvance />} />
				<Route path="/login" element={<LoginAdvance />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
