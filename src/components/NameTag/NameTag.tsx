import "./NameTag.css";
import React from "react";

interface NameTagProps {
  name: string;
}

const NameTag: React.FC<NameTagProps> = ({ name }) => {
  return (
    <div className="name-tag">
      <span className="name-tag-text">{name}</span>
    </div>
  );
};

export default NameTag;