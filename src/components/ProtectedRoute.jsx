import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FakeAuthentication";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
