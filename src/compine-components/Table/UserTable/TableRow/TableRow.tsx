import "./TableRow.css";
import React from "react";
import Account from "../../../../entities/account";
import { DateService } from "../../../../services/date-service";
import { CaretDownFill } from 'react-bootstrap-icons';
import accountService from "../../../../services/account-service";
import { Link } from "react-router-dom";

interface TableRowProps {
  isSubRow?: boolean;
  account: Account;
  parentAcc: Account|null|undefined;
  isChecked?: boolean;
  onCheckedChange?: (accountId: string) => void;
  onClick?: (account: Account) => void;
  onSubRowClick?: (account: Account) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  isSubRow = false,
  account,
  isChecked = false,
  parentAcc,
  onCheckedChange = () => { },
  onClick = () => {},
  onSubRowClick = () => {},
}) => {

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = React.useState<boolean>(false);
  const [subAccounts, setSubAccounts] = React.useState<Account[]>([]);

  React.useEffect(() => {
    const initSubAccountData = async () => {
      if (isExpanded && !isDataLoaded) {
        setIsDataLoaded(true);
        // Giả lập tải dữ liệu
        setSubAccounts(await accountService.getSubAccountsByParentID(account.accountId??""));
      }
    }
    initSubAccountData();
  }, [isExpanded, isDataLoaded, account.accountId]);

  return (
    <div className="row-wraper">
      <div
        onClick={() => {onClick(account);}}
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

        <div className="row-column-2"><Link to={`/account-control/user/${account.accountId}`} target="_blank" rel="noopener noreferrer">{`${account.displayName}/${account.username}`}</Link></div>

        <div className="row-column-3">
          <span>{`by ${parentAcc?.username}--${account.createdAt ? DateService.formatDate(account.createdAt) : ""}`}</span>
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
              onClick={() => {onSubRowClick(subAcc)}}
              key={subAcc.accountId}
              isSubRow={true}
              account={subAcc}
              parentAcc={account}
              onCheckedChange={onCheckedChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TableRow;