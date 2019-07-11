import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

function EmployeePage() {
  const { user } = useContext(AuthContext);

  return user.isAuthenticated ? (
    <div>EmployeePage and the user is {user.name} </div>
  ) : (
    <div> You need to log in to be able to see this page </div>
  );
}
export default EmployeePage;
