import React from "react";

/*customisable Status Tile used in execution logs table to display status
of each execution */

interface StatusTileProps {
  status: string;
  className?: string;
}

const StatusTile: React.FC<StatusTileProps> = ({ status, className = "" }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Finished":
        return "bg-backgroundGreen100 border border-borderGreen200 text-textGreen800";
      case "Error":
        return "bg-backgroundRed100 border border-borderRed200 text-textRed800";
      default:
        return "bg-borderGray100 text-textGray500";
    }
  };

  return (
    <span
      className={`p-1 inline-flex text-xs leading-5 font-semibold rounded-[6px] ${getStatusStyles(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusTile;
