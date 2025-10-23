import React from "react";
import "./MiniPolicyTable.css";
import { Policy } from "../../../entities/policies";
import PoolAccessLabel from "../../../components/PoolAccessLable/PoolAccessLable";

interface MiniPolicyTableProps {
  datas: Policy[];
  onSelected?: (selecteds: Policy[]) => void;
}

const MiniPolicyTable: React.FC<MiniPolicyTableProps> = ({ datas, onSelected }) => {
    
    const [rows, setRows] = React.useState<Policy[]>(
        datas.map((p) => ({ ...p, selected: !!p.selected }))
    );
    
    React.useEffect(() => {
        setRows(datas.map((p) => ({ ...p, selected: !!p.selected })));
    }, [datas]);

    React.useEffect(() => {
        if (onSelected) {
            onSelected(rows.filter((r) => r.selected));
        }
    }, [rows])

    const getId = (policy: Policy, index: number) => (policy.policyId ?? index);

    const isAllChecked = rows.length > 0 && rows.every((p) => !!p.selected);

    const toggleOne = (id: number | string) => {
        setRows((prev) =>
            prev.map((r, i) => {
                const rid = getId(r, i);
                if (rid === id) return { ...r, selected: !r.selected };
                return r;
            })
        );
    };

    const toggleAll = () => {
        const nextSelected = !isAllChecked;
        setRows((prev) => prev.map((r) => ({ ...r, selected: nextSelected })));
    };

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
                                onChange={toggleAll}
                                data-testid="select-all"
                            />
                        </th>
                        <th>Policy name</th>
                        <th>Access range</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((policy, index) => {
                        const id = getId(policy, index);
                        const checked = !!policy.selected;
                        const name = policy.policyName ?? "";
                        const accessRange = policy.accessRange ?? "";

                        return (
                            <tr key={id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleOne(id)}
                                        aria-label={`Select policy ${name}`}
                                        data-testid={`select-${id}`}
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
                    {rows.length === 0 && (
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
