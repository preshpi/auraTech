import React from "react";
import useUserRedirect from "../../hooks/useUserRedirect";

const Login = () => {
  // HOOKS
  const { isAuthenticated } = useUserRedirectt();
  const [isLoading, startTransition] = React.useTransition();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return <div></div>;
};

export default Login;
