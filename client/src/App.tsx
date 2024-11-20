import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper><Layout /></AuthWrapper>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
])

const App = () => {
  console.log("Rendering RouterProvider")

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App