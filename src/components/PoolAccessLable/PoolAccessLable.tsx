import React from "react";
import "./PoolAccessLable.css";

interface PoolAccessLabelProps {
  accessLevel: "edit" | "view";
}

const PoolAccessLabel: React.FC<PoolAccessLabelProps> = ({ accessLevel }) => {
  return (
    <span className={`pool-access-label ${accessLevel}`}>
      {accessLevel === "edit" ? "Edit" : "View"}
    </span>
  );
};

export default PoolAccessLabel;