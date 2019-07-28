import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

function OwnerPage() {
  const { user } = useContext(AuthContext);

  return user ? (
    <div>OwnerPage and the user is {user.name} </div>
  ) : (
    <div>OwnerPage but there is no user </div>
  );
}
export default OwnerPage;
