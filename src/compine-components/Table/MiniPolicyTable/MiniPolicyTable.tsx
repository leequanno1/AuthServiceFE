import React from "react";
import "./MiniPolicyTable.css";
import { Policy } from "../../../entities/policies";
import PoolAccessLabel from "../../../components/PoolAccessLable/PoolAccessLable";

interface MiniPolicyTableProps {
  datas: Policy[];
  onSelected?: (selecteds: Policy[]) => void;
}

const MiniPolicyTable: React.FC<MiniPolicyTableProps> = ({ datas, onSelected }) => {
    
    const isAllChecked = datas.length > 0 && datas.every((p) => !!p.selected);

    return (
        <div className="mini-policy-table-wrapper">
            <table className="mini-policy-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                aria-label="Select all policies"
                                checked={isAllChecked}
                                onChange={() => {
                                    // 
                                    if (onSelected && datas && datas.length > 0) {
                                        const tempDatas = datas.map(dt => {
                                            dt.selected = !isAllChecked;
                                            return dt;
                                        });
                                        onSelected(tempDatas);
                                    }
                                }}
                                data-testid="select-all"
                            />
                        </th>
                        <th>Policy name</th>
                        <th>Access range</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((policy, index) => {
                        // const id = getId(policy, index);
                        const checked = !!policy.selected;
                        const name = policy.policyName ?? "";
                        const accessRange = policy.accessRange ?? "";

                        return (
                            <tr>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => {
                                            if (onSelected) {
                                                const tempDatas = datas.map(dt => {
                                                    if (dt.policyId === policy.policyId) {
                                                        dt.selected = !policy.selected;
                                                    }
                                                    return dt;
                                                });
                                                onSelected(tempDatas);
                                            }
                                        }}
                                        aria-label={`Select policy ${name}`}
                                    />
                                </td>
                                <td>{name}</td>
                                <td>
                                    {accessRange === 1 && <PoolAccessLabel accessLevel="view" />}
                                    {accessRange === 2 && <PoolAccessLabel accessLevel="edit" />}
                                </td>
                            </tr>
                        );
                    })}
                    {datas.length === 0 && (
                        <tr>
                            <td colSpan={3} className="empty">
                                No policies
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MiniPolicyTable;
