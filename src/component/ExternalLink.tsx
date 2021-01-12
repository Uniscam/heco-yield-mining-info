import React from "react";
export const ExternalLink: React.FC<{ to: string }> = ({ to, children }) =>
    <>
        <a href={to} target="_blank" rel="noreferrer">{children}</a>
    </>