import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { login } from "../../store/Users/LoginUser";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { User } = useSelector((state: RootState): any => state.Login);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login(User)) {
      navigate("/");
    }
    setIsLoading(false);
  }, []);

  return <>{isLoading ? <h1>Loading...</h1> : children}</>;
};

export default PrivateRoute;