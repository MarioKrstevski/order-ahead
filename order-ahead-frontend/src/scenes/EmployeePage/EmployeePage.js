import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

function EmployeePage() {
  const { user } = useContext(AuthContext);

  return user ? (
    <div>EmployeePage and the user is {user.name} </div>
  ) : (
    <div>EmployeePage but there is no user </div>
  );
}
export default EmployeePage;
