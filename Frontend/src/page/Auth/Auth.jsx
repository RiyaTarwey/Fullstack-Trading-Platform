import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="authContainer h-screen relative">
      <div
        className=" bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex flex-col justify-center items-center
      h-[35rem] w-[30rem]
      rounded-xl 
      bg-black/50
        bg-opacity-10
        px-10
      shadow-2xl shadow-white
      z-50
    "
      >
        <h1 className="text-5xl font-extrabold  pb-6 drop-shadow-lg  "
        style={{color:'#FFFFFF'}}>
          Crypto Trading
        </h1>

        {location.pathname == "/signup" ? (
          <section className="w-full">
            <SignupForm />
            <div className="flex items-center justify-center">
              <span className="text-white">{"Already have account?"}</span>
              <Button
                onClick={() => navigate("/signin")}
                variant="ghost"
                className="text-white hover:text-blue-300 transition cursor-pointer"
              >
                Signin
              </Button>
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          <section className="w-full">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center">
              <span className="text-white">Back to login?</span>
              <Button
                onClick={() => navigate("/signin")}
                variant="ghost"
                className="text-white hover:text-blue-300 transition cursor-pointer"
              >
                Signup
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <SigninForm />
            <div className="flex items-center justify-center ">
              <span className="text-white">Don't have account?</span>
              <Button
                onClick={() => navigate("/signup")}
                variant="ghost"
                className="text-white hover:text-blue-300 transition cursor-pointer"
              >
                Signup
              </Button>
            </div>

            <div className="mt-10">
              <Button
                className=" cursor-pointer w-full py-4 bg-white/90 text-black font-semibold hover:bg-white transition shadow-md"
                onClick={() => navigate("/forgot-password")}
                variant="outline"
              >
                Forgot Password
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
