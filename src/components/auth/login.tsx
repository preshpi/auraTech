/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppDispatch } from "../../hooks/redux.hook";
import { useForm } from "react-hook-form";
import { logInSchema, TlogInSchema } from "../../../types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserRedirect from "../../hooks/useUserRedirect";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { config } from "../../helper/config";
import Input from "../ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { getUserDetailsFromSanity } from "../../utils/user.requests";
import { toast } from "sonner";
import { getErrorMessage } from "../../firebase/errorMapping";
import {
  GoogleAuthSignIn,
  signInWithGoogle,
} from "../../helper/signInWithGoogle";

const Login = () => {
  // HOOKS
  const { isAuthenticated } = useUserRedirect();
  const [isLoading, startTransition] = React.useTransition();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TlogInSchema>({ resolver: zodResolver(logInSchema) });

  // DECLARES
  const isLoggedIn = Cookies.get(config.key.userId);

  // FUNCTIONS
  const onSubmit = (data: TlogInSchema) => {
    startTransition(async () => {
      const { email, password } = data;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const { uid } = user;
        if (uid) {
          const sanityFetched = await getUserDetailsFromSanity({
            uid,
            dispatch,
          });
          if (sanityFetched?.success) {
            toast.success("Login Successful");
            reset();
            Cookies.set(config.key.userId, uid);
            const getLastPageVisit = Cookies.get(config.key.lastPath);
            if (getLastPageVisit) {
              navigate(getLastPageVisit);
              return;
            }
            navigate("/");
          }
        }
      } catch (err: any) {
        const errMsg = getErrorMessage(err?.code);
        toast.error(errMsg);
      }
    });
  };

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

  return !isAuthenticated ? (
    <div className="flex lg:justify-between md:justify-between justify-center min-h-screen w-full">
      <div className="lg:w-1/2 md:w-1/2 w-full h-[100vh] px-5 gap-y-5 bg-[#111111] flex items-center justify-center flex-col text-white">
        <div className="w-full space-y-6 max-w-[426px]">
          <h1 className="text-2xl font-bold text-primary-200 text-center">
            AuraTech.
          </h1>
          <p className="text-[32px] text-[#f0f0f0] font-[600] text-center">
            Welcome back
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
          <form className="w-full space-y-5 py-5">
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
            <div>
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
              <button className="text-right px-2 pt-3 text-[14px] cursor-pointer">
                <Link to="/forgot-password">Forgot password?</Link>
              </button>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || isLoading}
              className="bg-[#f0f0f0] cursor-pointer disabled:cursor-not-allowed text-black w-full rounded-full hover:opacity-70 disabled:opacity-70"
            >
              {isSubmitting || isLoading ? "Signing in..." : "Continue"}
            </Button>
            <p className="text-center text-xs text-accent-300">
              By continuing, you agree to auraTech Terms of Service and Privacy
              Policy.
            </p>

            <div>
              <p className="text-center text-sm text-accent-300">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#f0f0f0]">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-[100vh] bg-gray-100 lg:block md:block hidden">
        <img
          src="https://res.cloudinary.com/dpokiomqq/image/upload/v1741448823/login-1_gfqkvq.jpg"
          alt="right-side-background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  ) : null;
};

export default Login;
