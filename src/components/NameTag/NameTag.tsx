import "./NameTag.css";
import React from "react";

interface NameTagProps {
  name: string;
  onClick?: () => void;
}

const NameTag: React.FC<NameTagProps> = ({ name, onClick }) => {
  return (
    <div className="name-tag" onClick={onClick}>
      <span className="name-tag-text">{name}</span>
    </div>
  );
};

export default NameTag;