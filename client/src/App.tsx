import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import HomePage from "./components/homepage/HomePage"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import AuthProvider from "./components/context/AuthProvider"
import NavBar from "./components/navigation/NavBar"
import Dashboard from "./components/dashboard/Dashboard"
import AuthWrapper from "./components/context/AuthWrapper"
import stylesApp from "./App.module.css"

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className={stylesApp['main-container']}>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />

            <Route element={<AuthWrapper />}>
              <Route element={<Layout />}>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/dashboard"} element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App