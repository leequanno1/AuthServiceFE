import React, { useEffect, useState } from "react";
import "./MiniPoolInfo.css";
import Card from "../../../components/Card/Card";
import IconButton from "../../../components/IconButton/IconButton";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";
import {
  ArrowClockwise,
  ArrowSquareIn,
  Check,
  Copy,
  Eye,
  EyeSlash,
  Pen,
} from "phosphor-react";
import NameTag from "../../../components/NameTag/NameTag";
import { UserPool } from "../../../entities/user-pool";
import { DateService } from "../../../services/date-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import userPoolService from "../../../services/user-pool-service";

interface MiniPoolInfoProps {
  userPool: UserPool | null;
}

const MiniPoolInfo: React.FC<MiniPoolInfoProps> = ({ userPool }) => {
  const [isShowKey, setIsShowKey] = useState(false);
  const [poolKey, setPoolKey] = useState<string>("");

  useEffect(() => {
    setPoolKey(userPool?.poolKey??"");
  }, [userPool])

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card
      title="Pool's infomation"
      optionButtons={
        <>
          <LinkIconButton
            to={`/pool-control/update/${userPool?.poolId}`}
            Icon={Pen}
            IconSize={24}
          />
          <LinkIconButton
            to={
              userPool === null
                ? "/pool-control"
                : `/pool-control/pool/${userPool?.poolId}`
            }
            Icon={ArrowSquareIn}
            IconSize={24}
          />
        </>
      }
      content={
        <div className="card-scroll-able">
          <div className="card-pool-content">
            {userPool !== null && (
              <>
                <div className="content-left">
                  <h3>POOL NAME: {userPool?.poolName}</h3>
                  <div className="tag-pair">
                    <span>User's field:</span>
                    <div className="tag-names">
                      {userPool?.userFields?.map((name) => (
                        <NameTag name={name} />
                      ))}
                    </div>
                  </div>
                  <div className="tag-pair">
                    <span>Authentication field:</span>
                    <div className="tag-names">
                      {userPool?.authorizeFields?.map((name) => (
                        <NameTag name={name} />
                      ))}
                    </div>
                  </div>
                  <div className="date-text">
                    Created at: {DateService.formatDate(userPool?.createdAt)}
                  </div>
                  <div className="date-text last">
                    Updated at: {DateService.formatDate(userPool?.updatedAt)}
                  </div>
                </div>

                <div className="verticle-line"></div>

                <div className="content-right">
                  <h3>SECURITY INFORMATION</h3>
                  <div>
                    <span>Pool key: </span>
                    <span className="key-value">
                      {isShowKey
                        ? poolKey
                        : poolKey
                            ?.split("")
                            .map((item) => "•")
                            .join("")}
                    </span>
                    <IconButton
                      onClick={() => {
                        setIsShowKey(!isShowKey);
                      }}
                      Icon={isShowKey ? EyeSlash : Eye}
                      IconSize={20}
                    />
                    <IconButton
                      onClick={() => {
                        handleCopy(userPool?.poolKey ?? "");
                      }}
                      Icon={Copy}
                      IconSize={20}
                    />
                    <ConfirmPopup
                      children={
                        <IconButton
                          onClick={() => {}}
                          Icon={ArrowClockwise}
                          IconSize={20}
                          title="Reset Pool key"
                          color="var(--danger-color)"
                        />
                      }
                      onAccept={async () => {
                        const newKey = await userPoolService.resetPoolKey(userPool?.poolId??"");
                        setPoolKey(newKey);
                      }}
                    />
                  </div>
                  <div className="date-text">
                    <span>
                      Email verification:{" "}
                      {userPool?.emailVerify ? "Enable" : "Disable"}
                    </span>{" "}
                    {userPool.emailVerify && (
                      <Check color="var(--success-color)" size={20} />
                    )}{" "}
                  </div>
                  <div className="date-text">
                    <span>
                      Access Token expired:{" "}
                      {!!userPool?.accessExpiredMinutes
                        ? `${userPool.accessExpiredMinutes} minute(s)`
                        : "None set"}
                    </span>
                  </div>
                  <div className="date-text">
                    <span>
                      Refresh Token expired:{" "}
                      {!!userPool?.refreshExpiredDays
                        ? `${userPool.refreshExpiredDays} day(s)`
                        : "None set"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      }
    />
  );
};

export default MiniPoolInfo;
