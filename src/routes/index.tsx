import { useAuth } from "../hooks/useAuth";
import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { Loading } from "../components/Loading";

const isLoading = false;




export function Routes() {
const {session} = useAuth()

  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <DashboardRoutes />;
      default:
        return <AuthRoutes />;
    }
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
