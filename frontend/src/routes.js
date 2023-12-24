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
import Patients from "./pages/Patients";
import PatientProfilePage from "./pages/PatientProfilePage";

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
    },
    {
        path: '/patients',
        Component: <Patients/>
    },
    {
        path: '/patient-profile/:id',
        Component: <PatientProfilePage/>
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