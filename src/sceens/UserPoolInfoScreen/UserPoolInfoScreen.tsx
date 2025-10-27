import React from "react";
import "./UserPoolInfoScreen.css";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { UserPool } from "../../entities/user-pool";
import userPoolStore from "../../store/user-pool.store";
import userPoolService from "../../services/user-pool-service";
import poolPoliciesService from "../../services/pool-policies-service";

const UserPoolInfoScreen: React.FC = () => {
  const location = useLocation();
  const {poolID} = useParams();
  const [userPool, setUserPool] = React.useState<UserPool | null>(null);

  React.useEffect(() => {
    const initData = async () => {
      if (poolID) {
        let tempPool = userPoolStore.getState().userPoolsMap.get(poolID);
        if (tempPool) {
          setUserPool(tempPool);
        } else {
          // refresh pools and policies
          await userPoolService.refreshUserPool();
          await poolPoliciesService.refreshPoolPolicies();
          tempPool = userPoolStore.getState().userPoolsMap.get(poolID);
          if (tempPool) {
            setUserPool(tempPool);
          } else {
            // TODO: foward to bad request page
          }
        }
      } else {
        // TODO: foward to bad request page
      }
    }

    initData();
  }, [poolID]);

  return (
    <div className="user-pool-info-screen-container">
      <h1>Pool Name: Pool Name In Camelcase</h1>

      <div style={{width:"100%"}}>
        <MiniPoolInfo userPool={userPool} />
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
