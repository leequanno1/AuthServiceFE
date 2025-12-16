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
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Pen,
} from "phosphor-react";
import NameTag from "../../../components/NameTag/NameTag";
import { UserPool } from "../../../entities/user-pool";
import { DateService } from "../../../services/date-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import userPoolService from "../../../services/user-pool-service";
import CustomizablePopup from "../../../components/CustomizablePopup/CustomizablePopup";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { api } from "../../../services/api-service";
import { toastService } from "../../../services/toast-service";
import poolPoliciesService from "../../../services/pool-policies-service";
import userPoolPoliciesStore from "../../../store/user-pool-policies.store";
import accountService from "../../../services/account-service";

interface MiniPoolInfoProps {
  userPool: UserPool | null;
  showEditEmailConfig?: boolean;
  showOpenFeature?: boolean;
}

const MiniPoolInfo: React.FC<MiniPoolInfoProps> = ({
  userPool,
  showEditEmailConfig = true,
  showOpenFeature = true,
}) => {
  const [isShowKey, setIsShowKey] = useState(false);
  const [poolKey, setPoolKey] = useState<string>("");
  const [canView, setCanView] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    // get pool policys to check permission
    const handleInitPoolInfo = async () => {
      if (accountService.isRoot()) {
        setCanView(true);
        setCanEdit(true);
        setPoolKey(userPool?.poolKey ?? "");
        return;
      }

      await poolPoliciesService.refreshPoolPolicies();
      const tempPolicies = userPoolPoliciesStore
        .getState()
        .userPoolPoliciesMapByPoolID.get(userPool?.poolId ?? "");
      if (tempPolicies) {
        // can edit
        setCanEdit(!!tempPolicies.canEdit);
        // can view
        if (tempPolicies.canView) {
          setCanView(true);
          setPoolKey(userPool?.poolKey ?? "");
        } else {
          setCanView(false);
        }
      } else {
        setCanView(false);
        setCanEdit(false);
      }
    };

    handleInitPoolInfo();
  }, [userPool]);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  console.log("isRoot:", accountService.isRoot());
  console.log("canEdit:", canEdit);
  console.log("canView:", canView);

  return (
    <Card
      title="Pool's infomation"
      optionButtons={
        <>
          {(accountService.isRoot() ||
            (!accountService.isRoot() && canEdit)) && (
            <LinkIconButton
              title="Update user pool"
              to={`/pool-control/update/${userPool?.poolId}`}
              Icon={Pen}
              IconSize={24}
            />
          )}

          {!!showEditEmailConfig && (accountService.isRoot() ||
            (!accountService.isRoot() && canEdit)) && (
            <CustomizablePopup
              content={<UpdateMailConfigBox poolId={userPool?.poolId ?? ""} />}
              children={
                <IconButton
                  title="Update Mail Config"
                  onClick={() => {}}
                  Icon={EnvelopeSimple}
                />
              }
            />
          )}
          {!!showOpenFeature && (
            <LinkIconButton
              title="Open in new tab"
              to={
                userPool === null
                  ? "/pool-control"
                  : `/pool-control/pool/${userPool?.poolId}`
              }
              target="_blank"
              Icon={ArrowSquareIn}
              IconSize={24}
            />
          )}
        </>
      }
      content={
        <div className="card-scroll-able">
          <div className="card-pool-content">
            {userPool !== null &&!canView && (
              <div style={{ minHeight: "100px" }}>
                <h4 className="pd-10 mt-10 plc-alert">
                  You don't have permission to view this pool data.
                </h4>
              </div>
            )}
            {canView && userPool !== null && (
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
                      title={`${isShowKey ? "Hide Key" : "Show Key"}`}
                      onClick={() => {
                        setIsShowKey(!isShowKey);
                      }}
                      Icon={isShowKey ? EyeSlash : Eye}
                      IconSize={20}
                    />
                    <IconButton
                      title="Copy Pool Key"
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
                        const newKey = await userPoolService.resetPoolKey(
                          userPool?.poolId ?? ""
                        );
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

const UpdateMailConfigBox: React.FC<{
  poolId: string;
  onClose?: () => void;
}> = ({ poolId, onClose = () => {} }) => {
  const [siteName, setSiteName] = useState<string>("");
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [supportEmail, setSuportEmail] = useState<string>("");

  useEffect(() => {
    const initData = async () => {
      // get config data
      try {
        const response = await api.get(`/user-pool/mail-config/${poolId}`);
        const data: any = response.data.result;

        setSiteName(data.siteName ?? "");
        setSiteUrl(data.siteUrl ?? "");
        setSuportEmail(data.supportEmail ?? "");
      } catch (error) {
        toastService.error("An error occurred while loading mail config.");
      }
    };

    initData();
  }, [poolId]);

  const configUpdate = async (onClose: () => void) => {
    try {
      await api.post(`/user-pool/update-mail-config`, {
        poolId,
        siteName,
        siteUrl,
        supportEmail,
      });
      onClose();
    } catch (error) {
      toastService.error("An error occurred while update mail config.");
    }
  };

  return (
    <div className="update-mail-config-box">
      <h2>Update email config</h2>
      <InputText
        lable="Site name"
        placeholder="Your site name"
        value={siteName}
        onChange={(value) => setSiteName(value)}
      />
      <InputText
        lable="Site URL"
        placeholder="Your site url"
        value={siteUrl}
        onChange={(value) => setSiteUrl(value)}
      />
      <InputText
        lable="Support email"
        placeholder="Your support email"
        value={supportEmail}
        onChange={(value) => setSuportEmail(value)}
      />
      <div className="btns-container">
        <Button
          tyle="secondary"
          label="Cancel"
          onClick={() => {
            onClose();
          }}
          borderRadius={3}
        />
        <Button
          tyle="primary"
          label="Save"
          onClick={() => {
            configUpdate(onClose);
          }}
          borderRadius={3}
        />
      </div>
    </div>
  );
};
