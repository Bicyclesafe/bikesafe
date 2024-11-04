import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/homepage/HomePage"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import AuthProvider from "./components/context/AuthProvider"
/*import NavBar from "./components/navigation/NavBar"*/
import Dashboard from "./components/dashboard/Dashboard"
import AuthWrapper from "./components/context/AuthWrapper"


const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
         { /*<NavBar/>*/}
          <Routes>
            <Route path={"/login"} element={<Login />} />

            <Route element={<AuthWrapper />}>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/dashboard"} element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App