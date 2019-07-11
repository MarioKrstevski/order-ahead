import React, { useContext } from "react";
import { AuthhContext } from "../../AuthhContext";

function EmployeePage() {
  const { user } = useContext(AuthhContext);

  return user ? (
    <div>EmployeePage and the user is {user.name} </div>
  ) : (
    <div>EmployeePage but there is no user </div>
  );
}
export default EmployeePage;
