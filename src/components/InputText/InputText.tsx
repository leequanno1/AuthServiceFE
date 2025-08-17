import React from "react";
import "./InputText.css";
import { IconProps } from "phosphor-react";

interface InputTextProps{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email";
  width?: number;
  lable?: string;
  textSize?: number;
  Icon?: React.ComponentType<IconProps>;
  IconSize?: number;
  IconWeight?: "thin" | "light" | "regular" | "bold"
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  width = 300,
  lable,
  textSize = 14,
  Icon,
  IconSize = 20,
  IconWeight = "regular"
}) => {
  return ( 
    <div className="input-text-wrapper">
      {lable && <label className="input-label" style={{ fontSize: `${textSize + 2}px` }}>{lable}</label>}
      <div className={`input-text-container ${disabled ? "disabled" : ""}`}>
        {Icon && <Icon className="input-icon" size={IconSize} weight={IconWeight} />}
        <input
          className="input-text"
          type={type}
          value={value}
          style={{ fontSize: `${textSize}px`, width: `${width}px` }}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputText;