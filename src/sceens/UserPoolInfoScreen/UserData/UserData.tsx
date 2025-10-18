import React, { useState } from "react";
import "./UserData.css";
import { User } from "../../../entities/user";
import UserDataTable from "../../../components/UserDataTable/UserDataTable";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowClockwise, Trash } from "phosphor-react";

const UserData: React.FC = () => {
  const [userDatas,setUserDatas] = useState<User[]>(
    [
    {
      userId: "niga1",
      username: "myniga1",
      email: "emai@mail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga2",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga3",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga4",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga5",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga6",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga7",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga8",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga9",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga10",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga11",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga12",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga13",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
    {
      userId: "niga14",
      username: "myniga1",
      email: "emai@mail.com",
      phoneNumber: "0123456789",
      telCountryCode: "+84",
      lastName: "exlastname",
      firstName: "exfirstname",
      isValidated: false,
    },
  ]
  );

  const columns: string[] = [
    "userId",
    "username",
    "email",
    "phoneNumber",
    "telCountryCode",
    "lastName",
    "firstName",
    "isValidated",
    "backgroundImg",
    "backgroundImg",
    "backgroundImg",
    "backgroundImg",
    "backgroundImg",
    "backgroundImg",
  ];

  let selectedUser:User[] = [];

  const setSeletedUser= (users:User[]) => {
    selectedUser=users;
  }

  return (
    <div className="user-data-content">
      <h2>User Data</h2>
      <div className="button-container">
        <IconButton Icon={ArrowClockwise} onClick={() => {}} IconSize={24} />
        <IconButton
          Icon={Trash}
          onClick={() => {
            let seletedCopy = [...selectedUser];
            const userDataCopy = userDatas.filter((item) => {
              const res = seletedCopy.includes(item);
              if (res) {
                seletedCopy = seletedCopy.filter(sl => sl !== item);
              }
              return !res;
            });
            setUserDatas(userDataCopy)
          }}
          IconSize={24}
        />
      </div>
      <div>
        <UserDataTable
          data={userDatas}
          columns={columns}
          onRowSelected={setSeletedUser}
        />
      </div>
    </div>
  );
};

export default UserData;
