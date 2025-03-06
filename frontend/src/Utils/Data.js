export const componentData = [
    {
        id: 1,
        title: "Home",
        url: "/"
    },
    {
        id: 2,
        title: "About",
        url: "/about"
    },
    {
        id: 3,
        title: "Contact US",
        url: "/contact"
    }
]



import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
export const dashboardlinks = [
    {
        id: 1,
        name: "Dashboard",
        url: "mydashboard",
        icon: RxDashboard
    },
    {
        id: 2,
        name: "Profile",
        url: "myprofile",
        icon: CgProfile
    },
    {
        id: 3,
        name: "Setting",
        url: "setting",
        icon: IoSettingsOutline
    }
]

import { IoMdLogOut } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

export const modalData = [
    {
        id: 1,
        name: "Home",
        url: "/",
        icon: IoMdHome
    },
    {
        id: 2,
        name: "Profile",
        url: "/dashboard/myprofile",
        icon: CgProfile
    },
    {
        id: 3,
        name: "Setting",
        url: "/dashboard/setting",
        icon: IoSettingsOutline
    },
    {
        id: 4,
        name: "Logout",
        url: "/logout",
        icon: IoMdLogOut
    }
];