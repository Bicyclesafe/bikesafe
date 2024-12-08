import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./components/homepage/HomePage"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import AuthProvider from "./components/context/AuthProvider"
import NavBar from "./components/navigation/NavBar"
import Dashboard from "./components/dashboard/Dashboard"
import AuthWrapper from "./components/context/AuthWrapper"
import stylesApp from "./App.module.css"
import StatisticsPage from "./components/statistics/StatisticsPage"
import Commute from "./components/commute/Commute"
import Achievements from "./components/achievements/AchievementsPage"
import EmployerWrapper from "./components/context/EmployerWrapper"
import CompanyPage from "./components/company/CompanyPage"

const Layout = () => {
  return (
    <div className={stylesApp['main-container']}>
      <NavBar />
      <div className={stylesApp['main-content']}>
        <Outlet />
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
      { path: "commute", element: <Commute /> },
      { path: "statistics", element: <StatisticsPage />},
      { path: "achievements", element: <Achievements />},
    ],
  },
  {
    path: "/",
    element: <EmployerWrapper><Layout /></EmployerWrapper>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "company", element: <CompanyPage /> },
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