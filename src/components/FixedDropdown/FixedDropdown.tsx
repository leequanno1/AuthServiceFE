import React, { useState } from "react";
import "./FixedDropdown.css"

interface DropdownItem {
  label: string | React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  children: React.ReactNode;
  items: DropdownItem[];
  open?: boolean; 
}

const FixedDropdown: React.FC<DropdownProps> = ({ children, items, open }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Nếu prop open không được truyền, thì dropdown hoạt động ở uncontrolled mode
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  const toggleDropdown = () => {
    if (!isControlled) setInternalOpen((prev) => !prev);
  };

  return (
    <div className="dropdown">
      <span className="dropdown-trigger" onClick={toggleDropdown}>
        {children}
      </span>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => item.onClick()}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FixedDropdown;
