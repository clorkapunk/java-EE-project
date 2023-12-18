import Login from "./pages/Login";
import MainTabs from "./MainTabs";
import Register from "./pages/Register";
import Appointments from "./pages/Appointments";
import AppointmentPage from "./pages/AppointmentPage";

export const authRoutes = [
    {
        path: '/appointments',
        Component: <Appointments/>
    },
    {
        path: '/appointment/:id',
        Component: <AppointmentPage/>
    }
]

export const publicRoutes = [
    {
        path: '/login',
        Component: <Login/>
    },
    {
        path: '/registration',
        Component: <Register/>
    },
    {
        path: '/',
        Component: <MainTabs/>
    }

]