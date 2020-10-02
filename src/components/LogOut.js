import React from "react";

export default function LogOut(props) {
  return (
    <div>
      <h2>Log Out</h2>

      <form>
        <input value="Log Out" type="submit" onClick={props.handleLogOut} className="submit"/>
      </form>
    </div>
  );
}
