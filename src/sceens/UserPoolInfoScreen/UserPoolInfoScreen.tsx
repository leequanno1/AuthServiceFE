import React from "react";
import "./UserPoolInfoScreen.css";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserPool } from "../../entities/user-pool";
import userPoolStore from "../../store/user-pool.store";
import userPoolService from "../../services/user-pool-service";
import poolPoliciesService from "../../services/pool-policies-service";
import { toastService } from "../../services/toast-service";

const UserPoolInfoScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { poolID } = useParams();
  const [userPool, setUserPool] = React.useState<UserPool | null>(null);

  React.useEffect(() => {
    const initData = async () => {
      try {
        if (poolID) {
          await userPoolService.refreshUserPool();
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
              navigate("/page-not-found", {replace:true});
            }
          }
        } else {
          navigate("/page-not-found", {replace:true});
        }
      } catch (error) {
        toastService.error("An error occurred while loading user pool's data.")
      }
    };

    initData();
  }, [poolID]);

  return (
    <div className="user-pool-info-screen-container">
      <h1>Pool Name: {userPool?.poolName}</h1>

      <div style={{ width: "100%" }}>
        <MiniPoolInfo showOpenFeature={false} userPool={userPool} />
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
