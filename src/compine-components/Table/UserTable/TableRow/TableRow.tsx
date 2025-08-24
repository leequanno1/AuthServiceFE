import "./TableRow.css";
import React from "react";
import Account from "../../../../entities/account";
import { DateService } from "../../../../services/date-service";
import { CaretDownFill } from 'react-bootstrap-icons';

interface TableRowProps {
  isSubRow?: boolean;
  account: Account;
  isChecked?: boolean;
  onCheckedChange?: (accountId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  isSubRow = false,
  account,
  isChecked = false,
  onCheckedChange = () => { },
}) => {

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [subAccounts, setSubAccounts] = React.useState<Account[]>([]);

  React.useEffect(() => {
    if (isExpanded && !isDataLoaded) {
      console.log("load sub users");
      setIsDataLoaded(true);
      // Giả lập tải dữ liệu
      setTimeout(() => {
        setSubAccounts([
          {
            accountId: "1-1",
            displayName: "Sub User One",
            username: "subuser1",
            parentId: "user1",
            createdAt: new Date("2023-01-02"),
          },
          {
            accountId: "1-2",
            displayName: "Sub User Two",
            username: "subuser2",
            parentId: "user1",
            createdAt: new Date("2023-01-03"),
          },
        ]);
      }, 500);
    }
  }, [isExpanded, isDataLoaded]);

  return (
    <div className="row-wraper">
      <div
        className={`table-row ${isSubRow ? "sub-row" : ""}`}
        onDoubleClick={() => {
          setIsExpanded((prev) => !prev);
        }}
      >
        {!isSubRow ? (
          <div className="row-column-1">
            <input type="checkbox"
              id={account.accountId}
              checked={isChecked}
              onChange={() => onCheckedChange(account.accountId ?? "")} /></div>
        ) : (
          <div className="padding-left"></div>
        )}

        <div className="row-column-2">{`${account.displayName}/${account.username}`}</div>

        <div className="row-column-3">
          <span>{`by ${account.parentId}--${account.createdAt ? DateService.formatDate(account.createdAt) : ""}`}</span>
          <span className="flex-1"></span>
          {!isSubRow && (
            <CaretDownFill
              className={`dropdown-icon ${isExpanded ? "expanded" : ""}`}
              onClick={() => {
                setIsExpanded(!isExpanded);
                if (!isExpanded) {
                }
              }}
            />
          )}
        </div>
      </div>
      <div className={`sub-rows-container ${isExpanded ? "expanded" : ""}`}>
        {subAccounts.length > 0 && (
          subAccounts.map((subAcc) => (
            <TableRow
              key={subAcc.accountId}
              isSubRow={true}
              account={subAcc}
              onCheckedChange={onCheckedChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TableRow;