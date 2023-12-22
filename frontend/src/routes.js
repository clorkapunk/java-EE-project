import Login from "./pages/Login";
import MainTabs from "./MainTabs";
import Register from "./pages/Register";
import Appointments from "./pages/Appointments";
import AppointmentPage from "./pages/AppointmentPage";
import ProfilePage from "./pages/ProfilePage";
import Bills from "./pages/Bills";
import BillPage from "./pages/BillPage";
import DistrictDoctorPage from "./pages/DistrictDoctorPage";
import DoctorAppointmentsSchedulePage from "./pages/DoctorAppointmentsSchedulePage";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage";

export const authRoutes = [
    {
        path: '/appointments',
        Component: <Appointments/>
    },
    {
        path: '/appointment/:id',
        Component: <AppointmentPage/>
    },
    {
        path: '/profile',
        Component: <ProfilePage/>
    },
    {
        path: '/bills',
        Component: <Bills/>
    },
    {
        path: '/bill/:id',
        Component: <BillPage/>
    },
    {
        path: '/district-doctor',
        Component: <DistrictDoctorPage/>
    },
    {
        path: '/appointment-schedule',
        Component: <DoctorAppointmentsSchedulePage/>
    },
    {
        path: '/doctor-appointment/:id',
        Component: <DoctorAppointmentPage/>
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