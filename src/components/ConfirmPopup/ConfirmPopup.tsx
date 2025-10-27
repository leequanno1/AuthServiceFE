import React, { useState, useEffect, useRef } from "react";
import "./ConfirmPopup.css";

interface ConfirmPopupProps {
  title?: string;
  description?: string;
  onAccept?: () => void;
  children: React.ReactNode;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  onAccept,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleAccept = () => {
    onAccept?.();
    setOpen(false);
  };

  return (
    <>
      <span className="confirm-trigger" onClick={() => setOpen(true)}>
        {children}
      </span>

      {open && (
        <div className="confirm-overlay">
          <div ref={modalRef} className="confirm-modal">
            <h2 className="confirm-title">{title}</h2>
            <p className="confirm-description">{description}</p>

            <div className="confirm-actions">
              <button
                className="confirm-btn cancel-btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-btn accept-btn"
                onClick={handleAccept}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPopup;
