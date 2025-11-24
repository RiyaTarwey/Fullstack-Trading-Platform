// src/page/Navbar/Navbar.jsx
import React from "react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

import { Button } from "../../components/ui/button"; // named export
import Sidebar from "./Sidebar"; // keep your structure

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";

import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Navbar = () => {
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

          {/* changed justify-center -> justify-start */}
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
                    <span className="font-bold text-orange-700">Crypto</span>
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
        <p className="p-0 ml-9">
          <span className="font-bold text-orange-700">Crypto</span>
          <span>Trade</span>
        </p>
        <div className="p-0 ml-9">
          <Button className="flex items-center gap-3 bg-white text-black border border-gray-300 rounded-full cursor-pointer">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div>
        <Avatar className="bg-gray-500">
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
