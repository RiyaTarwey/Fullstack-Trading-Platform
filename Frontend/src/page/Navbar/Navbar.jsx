// src/page/Navbar/Navbar.jsx
import React from "react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

import { Button } from "../../components/ui/button";
import Sidebar from "./Sidebar";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";

import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { auth } = useSelector((store) => store);

  return (
    <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="rounded-full h-11 w-11 cursor-pointer"
              variant="ghost"
              size="icon"
            >
              <DragHandleHorizontalIcon className="h-7 w-7" />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-72 border-r-0 flex flex-col justify-start"
            side="left"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2022/12/26/11/37/crypto-7678815_1280.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-700 ">Crypto</span>
                    <span>Trade</span>
                  </div>
                </div>
              </SheetTitle>

              <SheetDescription className="hidden">
                Navigation Menu
              </SheetDescription>
            </SheetHeader>

            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* 🔥 Bigger Premium CryptoTrade text */}
        <Link
          to="/"
          className="p-0 ml-2 cursor-pointer flex items-center gap-3"
        >
          <img
            src="https://cdn.pixabay.com/photo/2022/12/26/11/37/crypto-7678815_1280.jpg"
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="text-3xl font-extrabold tracking-wider flex items-center">
            <span className="text-orange-700">Crypto</span>
            <span>Trade</span>
          </div>
        </Link>
      </div>

      <div>
        <Avatar className="bg-gray-500">
          <AvatarFallback>
            {auth.user?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
