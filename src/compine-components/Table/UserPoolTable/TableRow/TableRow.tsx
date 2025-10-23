import { CaretDownFill } from "react-bootstrap-icons";
import { UserPool } from "../../../../entities/user-pool";
import { DateService } from "../../../../services/date-service";
import { UserPoolPolicies } from "../../../../entities/user-pool-policies";
import "./TableRow.css";
import React from "react";
import PoolAccessLabel from "../../../../components/PoolAccessLable/PoolAccessLable";
import NameTag from "../../../../components/NameTag/NameTag";

interface TableRowProps {
    pool: UserPool;
    poolPolicies: UserPoolPolicies;
    isChecked?: boolean;
    onCheckedChange?: (accountId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
    pool,
    isChecked = false,
    poolPolicies,
    onCheckedChange = () => { },
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

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
                    <input type="checkbox"
                        id={pool.poolId}
                        checked={isChecked}
                        onChange={() => onCheckedChange(pool.poolId ?? "")} /></div>

                <div className="row-column-2">{pool.poolName}</div>

                <div className="row-column-3">
                    {/* {poolPolicies.viewableTargets?.includes(pool?.poolId ?? " ") && (
                        <PoolAccessLabel accessLevel="view" />
                    )}

                    {(poolPolicies.editableTargets?.includes(pool?.poolId ?? " ") ||
                        poolPolicies.manageableTargets?.includes(pool?.poolId ?? " ")) && (
                            <PoolAccessLabel accessLevel="edit" />
                        )} */}
                </div>

                <div className="row-column-4">
                    <span>{`by ${pool?.account?.rootId}--${pool?.createdAt ? DateService.formatDate(pool?.createdAt) : ""}`}</span>
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
                            <NameTag key={index} name={field} />
                        ))}
                    </div>
                </div>
                <div className="authorize-fields">
                    <span>Authorize Fields</span>
                    <div className="authorize-fields-list">
                        {pool.authorizeFields?.map((field, index) => (
                            <NameTag key={index} name={field} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableRow;