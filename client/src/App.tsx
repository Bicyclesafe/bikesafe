import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import AuthProvider from "./components/AuthProvider"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App