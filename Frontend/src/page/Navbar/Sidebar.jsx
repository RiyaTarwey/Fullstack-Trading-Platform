import React from "react";

import { Button } from "../../components/ui/button";
import { SheetClose } from "../../components/ui/sheet";
import { useDispatch } from "react-redux";


import {
  ExitIcon,
  HandIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";

import {
  CreditCardIcon,
  LandmarkIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/State/Auth/Action";

const menu = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6 items-center" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6 items-center" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <ExitIcon className="h-6 w-6 items-center" />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout=()=>{
    dispatch(logout())
  }

  return (
    <div className="mt-1 space-y-0.5">
      {menu.map((item) => (
        <div key={item.name}>
          <SheetClose className="w-full">
            <Button
              variant="outline"
              className="flex items-center gap-5 py-6 w-full cursor-pointer"
              onClick={() => {navigate(item.path)
                if(item.name=="Logout"){
                  handleLogout()
                }
              }}
            >
              <span className="w-8">{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
