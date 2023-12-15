import Auth from "./Auth";
import MainTabs from "./MainTabs";
import Register from "./Register";

export const publicRoutes = [
    {
        path: '/login',
        Component: <Auth/>
    },
    {
        path: '/registration',
        Component: <Register/>
    },
    {
        path: '/main',
        Component: <MainTabs/>
    }
]