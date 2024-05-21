import {Routes,BrowserRouter,Route} from "react-router-dom";
import Protected from "./Components/Protected.jsx";
import Home from "./Components/Home.jsx";
import Welcome from "./Components/Welcome.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import ProtectedRLOH from "./Components/ProtectedRLOH.jsx";
import Verify from "./Components/Verify.jsx";
const App = () => {
    return <div className="app">
        <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Protected Component={<Welcome />} />} />
            <Route path="/" element={<ProtectedRLOH Component={<Home />} />} />
            <Route path="/register" element={<ProtectedRLOH Component={<Register />} />} />
            <Route path="/verify" element={<ProtectedRLOH Component={<Verify />} />} />
            <Route path="/login" element={<ProtectedRLOH Component={<Login />} />} />
            <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
        </BrowserRouter>
    </div>;
}



export default App;