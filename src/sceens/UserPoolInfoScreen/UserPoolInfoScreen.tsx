import React from "react";
import "./UserPoolInfoScreen.css";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const UserPoolInfoScreen: React.FC = () => {
  const location = useLocation();
  const {poolID} = useParams();

  return (
    <div className="user-pool-info-screen-container">
      <h1>Pool Name: Pool Name In Camelcase</h1>

      <div style={{width:"100%"}}>
        <MiniPoolInfo />
      </div>

      <div className="renderable-container">
        <div className="tab-container">
          <Link
            className={
              !location.pathname.endsWith("monitor") &&
              !location.pathname.endsWith("user-data")
                ? "active"
                : ""
            }
            to={`/pool-control/pool/${poolID}`}
          >
            Accessable users
          </Link>
          <Link
            className={location.pathname.endsWith("monitor") ? "active" : ""}
            to={`/pool-control/pool/${poolID}/monitor`}
          >
            Monitoring
          </Link>
          <Link
            className={location.pathname.endsWith("user-data") ? "active" : ""}
            to={`/pool-control/pool/${poolID}/user-data`}
          >
            User data
          </Link>
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPoolInfoScreen;
