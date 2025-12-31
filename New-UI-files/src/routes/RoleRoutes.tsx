import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function RoleRoute({ children, allowedRoles }: Props) {
  const userString = localStorage.getItem("user");

  if (!userString) return <Navigate to="/login" replace />;

  const user = JSON.parse(userString);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
