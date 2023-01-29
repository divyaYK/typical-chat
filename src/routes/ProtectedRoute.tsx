import { useQuery } from "@apollo/client";
import { Navigate, useLocation } from "react-router-dom";
import { ReactElement, ReactNode } from "react";
import { GET_USER } from "../graphql/queries/userQueries";
import ErrorComponent from "../components/error/Error";

interface IProtectedRoute {
  children:
    | JSX.Element
    | JSX.Element[]
    | ReactNode
    | ReactNode[]
    | ReactElement;
}

const ProtectedRoute = ({ children }: IProtectedRoute):any => {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { data, loading, error } = useQuery(GET_USER);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <ErrorComponent />;
  }

  if (data && data?.getUser?._id) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
