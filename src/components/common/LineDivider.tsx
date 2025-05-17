import React from "react";

//horizontal line divider used in the app

export const LineDivider: React.FC<{ className?: string }> = ({
  className = "",
}) => <hr className={`border-t border-borderGray200 ${className}`} />;

export default LineDivider;
