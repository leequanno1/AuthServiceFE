import React, { useState, useRef, useEffect } from "react";
import "./CustomizablePopup.css";

interface PopupProps {
  children: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  hasPadding?: boolean;
}

const CustomizablePopup: React.FC<PopupProps> = ({
  children,
  content,
  disabled = false,
  hasPadding = true,
}) => {
  const [open, setOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setOpen(false);
      setAnimateOut(false);
    }, 200); // thời gian khớp với animation CSS
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div className="popup-wrapper">
      {/* Trigger */}
      <span
        className="popup-trigger"
        onClick={() => setOpen(true)}
      >
        {children}
      </span>

      {/* Popup content */}
      {open && (
        <div
          className={`popup-overlay ${animateOut ? "fade-out" : "fade-in"}`}
        >
          <div
            ref={popupRef}
            className={`popup-content ${hasPadding? "contain-padding" : ""} ${animateOut ? "scale-out" : "scale-in"}`}
          >
            {React.isValidElement(content)
              ? React.cloneElement(content as React.ReactElement<any>, {
                  onClose: handleClose,
                })
              : content}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizablePopup;
