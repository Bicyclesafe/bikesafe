import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Register from "./components/Register"
import AuthProvider from "./components/AuthProvider"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App