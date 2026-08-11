import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
