import React, { useEffect, useState } from "react";
import "./UserData.css";
import { User } from "../../../entities/user";
import UserDataTable from "../../../components/UserDataTable/UserDataTable";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowClockwise, Trash } from "phosphor-react";
import { useParams } from "react-router-dom";
import userPoolService from "../../../services/user-pool-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import { toastService } from "../../../services/toast-service";

const UserData: React.FC = () => {
  const [userDatas, setUserDatas] = useState<User[]>([]);
  const [columns, setCollums] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isNoPlc, setIsNoPlc] = useState<boolean>(false);
  const { poolID } = useParams();

  let selectedUser: User[] = [];

  const setSeletedUser = (users: User[]) => {
    selectedUser = users;
  };

  useEffect(() => {
    const getSataterData = async () => {
      try {
        if (!!poolID) {
          // get users
          const tmpUsers = await userPoolService.getUsers(poolID);
          setUserDatas(tmpUsers);
          // get collum
          const tmpCollums = await userPoolService.getUserFields(poolID);
          setCollums(tmpCollums);
        }
      } catch (error) {
        setIsNoPlc(true);
      }
    };

    getSataterData();
  }, [poolID, counter]);

  return (
    <div className="user-data-content">
      {!!isNoPlc && <div><h2 className="pd-10 mt-20 plc-alert">This account have no authority to manage this user pool data.</h2></div>}

      {!isNoPlc && (
        <>
          <h2>User Data</h2>
          <div className="button-container">
            <IconButton
              Icon={ArrowClockwise}
              onClick={() => {
                setCounter(counter + 1);
              }}
              IconSize={24}
            />
            <ConfirmPopup
              onAccept={async () => {
                let seletedCopy = [...selectedUser];
                try {
                  await userPoolService.deleteUsers(poolID ?? "", seletedCopy);
                  const userDataCopy = userDatas.filter((item) => {
                    const res = seletedCopy.includes(item);
                    if (res) {
                      seletedCopy = seletedCopy.filter((sl) => sl !== item);
                    }
                    return !res;
                  });
                  setUserDatas(userDataCopy);
                } catch (error) {
                  toastService.error(
                    "An error occurred while deleting user(s)."
                  );
                }
              }}
              children={
                <IconButton Icon={Trash} onClick={() => {}} IconSize={24} />
              }
            />
          </div>
          <div>
            <UserDataTable
              data={userDatas}
              columns={columns}
              onRowSelected={setSeletedUser}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserData;
