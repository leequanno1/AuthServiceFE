import { CaretDownFill } from "react-bootstrap-icons";
import { UserPool } from "../../../../entities/user-pool";
import { DateService } from "../../../../services/date-service";
import { UserPoolPolicies } from "../../../../entities/user-pool-policies";
import "./TableRow.css";
import React from "react";
import PoolAccessLabel from "../../../../components/PoolAccessLable/PoolAccessLable";
import NameTag from "../../../../components/NameTag/NameTag";
import policyService from "../../../../services/policy-service";
import { Link } from "react-router-dom";

interface TableRowProps {
  pool: UserPool;
  poolPolicies: UserPoolPolicies | undefined;
  isChecked?: boolean;
  isRoot?: boolean;
  rootUsername?: string;
  onCheckedChange?: (accountId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  pool,
  isChecked = false,
  poolPolicies,
  isRoot,
  rootUsername,
  onCheckedChange = () => {},
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const accessLevel: number = policyService.getPoolAccessLevel(poolPolicies);

  React.useEffect(() => {
    if (isExpanded) {
      console.log("load sub users");
      // Giả lập tải dữ liệu
    }
  }, [isExpanded]);

  return (
    <div className="row-wraper">
      <div
        className={`table-row`}
        onDoubleClick={() => {
          setIsExpanded((prev) => !prev);
        }}
      >
        <div className="row-column-1">
          <input
            type="checkbox"
            id={pool.poolId}
            checked={isChecked}
            onChange={() => onCheckedChange(pool.poolId ?? "")}
          />
        </div>

        <div className="row-column-2"><Link to={`/pool-control/pool/${pool.poolId}`} rel="noopener noreferrer">{pool.poolName}</Link></div>

        <div className="row-column-3">
          {accessLevel === 1 && <PoolAccessLabel accessLevel="view" />}
          {accessLevel === 2 && <PoolAccessLabel accessLevel="edit" />}
          {(accessLevel === 3 || isRoot) && (
            <>
              <PoolAccessLabel accessLevel="view" />
              <PoolAccessLabel accessLevel="edit" />
            </>
          )}
        </div>

        <div className="row-column-4">
          <span>{`by ${rootUsername}--${
            DateService.formatDate(pool?.createdAt??new Date())
          }`}</span>
          <span className="flex-1"></span>
          <CaretDownFill
            className={`dropdown-icon ${isExpanded ? "expanded" : ""}`}
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) {
              }
            }}
          />
        </div>
      </div>
      <div className={`description-container ${isExpanded ? "expanded" : ""}`}>
        <div className="user-fields">
          <span>User Fields</span>
          <div className="user-fields-list">
            {pool.userFields?.map((field, index) => (
              <NameTag name={field} />
            ))}
          </div>
        </div>
        <div className="authorize-fields">
          <span>Authorize Fields</span>
          <div className="authorize-fields-list">
            {pool.authorizeFields?.map((field, index) => (
              <NameTag name={field} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRow;
