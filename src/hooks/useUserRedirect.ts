import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../helper/config";
import React from "react";

const useUserRedirect = () => {
  // HOOKS
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //   USE EFFECTS
  React.useEffect(() => {
    const isLoggedIn = document.cookie.includes(config.key.userId);

    const authRoutes = ["/login", "/signup"];

    const isGuard = authRoutes.find((route) => pathname.startsWith(route));

    if (isLoggedIn && isGuard) {
      setIsAuthenticated(true);
      navigate(-1);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  return { isAuthenticated };
};

export default useUserRedirect;
