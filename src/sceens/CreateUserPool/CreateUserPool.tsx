import React from "react";
import "./CreateUserPool.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const CreateUserPool: React.FC = () => {
  const location = useLocation();

  return (
    <div className="create-user-pool-container">
      <h1>Create User Pool</h1>
      <div className="scrollable-container">
        <div className="mode-container">
          <Link to={"/pool-control/create"}>
            <div className="createMode full-function">
              <div className="head-line">
                <input
                  readOnly
                  type="radio"
                  checked={!location.pathname.includes("empty-function")}
                />
                <span>Create a full functional pool</span>
              </div>
            </div>
          </Link>
          <Link to={"/pool-control/create/empty-function"}>
            <div className="createMode empty-function">
              <div className="head-line">
                <input
                  type="radio"
                  checked={location.pathname.includes("empty-function")}
                  readOnly
                />
                <span>Create a empty pool</span>
              </div>
            </div>
          </Link>
        </div>

        <Outlet/>
      </div>
    </div>
  );
};

export default CreateUserPool;
