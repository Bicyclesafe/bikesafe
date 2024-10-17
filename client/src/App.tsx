import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/homepage/HomePage"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import AuthProvider from "./components/context/AuthProvider"
import NavBar from "./components/navigation/NavBar"

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar/>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App