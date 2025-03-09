/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TsignUpSchema } from "../../types/auth/signup";
import { FcGoogle } from "react-icons/fc";
import Input from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthSignIn,
  signInWithGoogle,
} from "../../helper/signInWithGoogle";
import { config } from "../../helper/config";
import { useAppDispatch } from "../../hooks/redux.hook";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { getErrorMessage } from "../../firebase/errorMapping";
import { createUserOnSanity } from "../../utils/user.requests";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [isLoading, startTransition] = React.useTransition();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TsignUpSchema>({ resolver: zodResolver(signUpSchema) });

  // DECLARES
  const isLoggedIn = Cookies.get(config.key.userId);

  // FUNCTIONS
  const handleGoogleSignIn = async () => {
    startTransition(async () => {
      const result = await signInWithGoogle();
      if (result) {
        GoogleAuthSignIn({
          reset,
          startTransition,
          dispatch,
          navigate,
          result,
        });
      }
    });
  };

  // USE EFFECTS
  React.useEffect(() => {
    if (isLoggedIn) {
      const getLastPageVisit = Cookies.get(config.key.lastPath);
      if (getLastPageVisit) {
        navigate(getLastPageVisit);
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  const onSubmit = (data: TsignUpSchema) => {
    startTransition(async () => {
      const { email, password, firstname, lastname, phone } = data;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        const { uid, email: userEmail, emailVerified } = user;

        if (uid) {
          const userData = {
            uid,
            firstname,
            lastname,
            email: userEmail,
            phone,
            emailVerified: emailVerified,
            isGoogle: emailVerified,
          };
          const res = await createUserOnSanity({
            userData,
            dispatch,
            navigate,
          });

          if (res?.success) {
            reset();
          }
        }
      } catch (err: any) {
        const errMsg = getErrorMessage(err?.code);
        toast.error(errMsg);
      }
    });
  };

  return (
    <div className="flex lg:justify-between md:justify-between justify-center min-h-screen w-full">
      <div className="lg:w-1/2 md:w-1/2 w-full h-[100vh] p-5 bg-[#111111] flex items-center justify-center flex-col text-white">
        <div className="w-full lg:space-y-6 space-y-4 max-w-[426px]">
          <h1 className="text-2xl font-bold text-primary-200 text-center">
            AuraTech.
          </h1>
          <p className="text-[32px] text-[#f0f0f0] font-[600] text-center">
            Create your account
          </p>

          <div className="pt-5">
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
              className="border cursor-pointer w-full rounded-full border-gray-300 flex items-center gap-3 justify-center text-white"
            >
              <span className="text-[18px]">
                {" "}
                <FcGoogle />
              </span>
              Continue with Google
            </Button>
          </div>

          <div className="flex w-full items-center justify-center gap-5">
            <span className=" border-accent-200 border-[0.5px] w-full"></span>
            <p className="text-accent-200 text-sm">or</p>
            <span className=" border-accent-200 border-[0.5px] w-full"></span>
          </div>

          <div className="w-full flex justify-center items-center max-w-[300px] mx-auto gap-5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`w-[30px] h-[30px] rounded-full ${
                step === 1
                  ? "bg-accent-200 text-black"
                  : "border text-accent-200"
              } `}
            >
              1
            </button>
            <hr className="border border-accent-200 rounded-md w-16" />
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`${
                step === 2
                  ? "bg-accent-200 text-black"
                  : "border text-accent-200"
              }  rounded-full w-[30px] h-[30px]`}
            >
              2
            </button>
            <hr className="border border-accent-200 rounded-md w-16" />
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`${
                step === 3
                  ? "bg-accent-200 text-black"
                  : "border text-accent-200"
              }  rounded-full w-[30px] h-[30px]`}
            >
              3
            </button>
          </div>

          <form
            className="w-full space-y-5 py-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="firstname"
                    {...register("firstname")}
                    type="text"
                    autoComplete="off"
                    placeholder="Enter first name"
                  />
                  {errors.firstname && (
                    <span className="text-[#F24822] text-sm">{`${errors.firstname.message}`}</span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="lastname"
                    type="text"
                    {...register("lastname")}
                    autoComplete="off"
                    placeholder="Enter last name"
                  />
                  {errors.lastname && (
                    <span className="text-[#F24822] text-sm">{`${errors.lastname.message}`}</span>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="off"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <span className="text-[#F24822] text-sm">{`${errors.email.message}`}</span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="phone"
                    type="text"
                    {...register("phone")}
                    autoComplete="off"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <span className="text-[#F24822] text-sm">{`${errors.phone.message}`}</span>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    password
                    autoComplete="off"
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <span className="text-[#F24822] text-sm">{`${errors.password.message}`}</span>
                  )}
                </div>
                <div className="flex flex-col gap-y-2">
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    password
                    autoComplete="off"
                    placeholder="Confirm your Password"
                  />
                  {errors.confirmPassword && (
                    <span className="text-[#F24822] text-sm">{`${errors.confirmPassword.message}`}</span>
                  )}
                </div>
              </div>
            )}
            {step === 1 ? (
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await trigger(["firstname", "lastname"]);
                  if (isValid) setStep(2);
                }}
                disabled={isSubmitting || isLoading}
                className="bg-[#f0f0f0] cursor-pointer disabled:cursor-not-allowed text-black w-full rounded-full hover:opacity-70 disabled:opacity-70"
              >
                Next
              </Button>
            ) : step === 2 ? (
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await trigger(["email", "phone"]);
                  if (isValid) setStep(3);
                }}
                disabled={isSubmitting || isLoading}
                className="bg-[#f0f0f0] cursor-pointer disabled:cursor-not-allowed text-black w-full rounded-full hover:opacity-70 disabled:opacity-70"
              >
                Next
              </Button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-[#f0f0f0] py-3 cursor-pointer disabled:cursor-not-allowed text-black w-full rounded-full hover:opacity-70 disabled:opacity-70"
              >
                {isSubmitting || isLoading ? "Signing in..." : "Continue"}
              </button>
            )}

            <p className="text-center text-xs text-accent-300">
              By continuing, you agree to auraTech Terms of Service and Privacy
              Policy.
            </p>

            <div>
              <p className="text-center text-sm text-accent-300">
                Already have an account?{" "}
                <Link to="/login" className="text-[#f0f0f0]">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-[100vh] bg-gray-100 lg:block md:block hidden">
        <img
          src="https://res.cloudinary.com/dpokiomqq/image/upload/v1741451676/pexels-abdulkadir-hatay-2519755-27836561_qjqu5h.jpg"
          alt="right-side-background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Signup;
