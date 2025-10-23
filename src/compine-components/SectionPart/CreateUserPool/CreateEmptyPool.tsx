import React from "react";
import "./CreateEmptyPool.css";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { CFFP_ERROR_MESSAGE } from "../../../constants/error-message/create-full-functional-pool";
import { UserPool } from "../../../entities/user-pool";
import { api } from "../../../services/api-service";
import { useNavigate } from "react-router-dom";
import { getServerErrorCode } from "../../../services/error-code-service";

const CreateEmptyPool: React.FC = () => {
  const [poolName, setPoolName] = React.useState<string>("");
  const [errorCode, setErrorCode] = React.useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="input-form">
      <div className="validationable">
        <InputText
          stretch={false}
          onChange={(value) => {
            setPoolName(value);
          }}
          value={poolName}
          lable="User pool name"
          placeholder="example_user_pool_name"
        />
        {errorCode === "CC1002" && <small>{CFFP_ERROR_MESSAGE.CC1002}</small>}
        {errorCode === "SC2002" && <small>{CFFP_ERROR_MESSAGE.SC2002}</small>}
      </div>
      <Button
        tyle="tertiary"
        onClick={async () => {
          if (!poolName) {
            setErrorCode("CC1002");
            return;
          }

          try {
            const body: UserPool = {
              poolName: poolName,
              emailVerify: false,
              accessExpiredMinutes: 2,
              refreshExpiredDays: 7,
            };
            const response = await api.post("/user-pool/create", body);
            const poolID = response.data.message;
            navigate(`/pool-control/pool/${poolID}`, { replace: true });
          } catch (error) {
            setErrorCode(getServerErrorCode(error).toString());
          }
        }}
        label="Confirm created"
        borderRadius={3}
      />
    </div>
  );
};

export default CreateEmptyPool;
