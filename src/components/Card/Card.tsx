import React, { FC, ReactNode } from "react";
import "./Card.css"

interface CardProps {
    title: string;
    optionButtons?: ReactNode; // array of React components/elements
    content?: ReactNode; // legacy prop (kept for backward compatibility)
    children?: ReactNode; // new: use <Card>...</Card>
    className?: string;
    "data-testid"?: string;
    minWidth?: string;
}

const Card: FC<CardProps> = ({
    title,
    optionButtons,
    content = null,
    children = null,
    className = "",
    "data-testid": testId,
    minWidth="300px",
}) => {
    const headerId = `card-${Math.random().toString(36).slice(2, 9)}`;

    return (
        <div
            role="region"
            aria-labelledby={headerId}
            className={`qa-card ${className}`}
            style={{
                minWidth:minWidth,
                width: "fit-content"
            }}
        >
            <div className="qa-card-header">
                <h2 id={headerId}>
                    {title}
                </h2>

                <div className="qa-card-buttons" style={{marginRight: optionButtons? "10px": "0"}}>
                    {optionButtons}
                </div>
            </div>

            <div className="qa-card-content">{children ?? content}</div>
        </div>
    );
};

export default Card;