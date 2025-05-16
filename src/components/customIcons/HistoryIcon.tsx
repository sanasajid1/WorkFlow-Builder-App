import React from "react";

//this is a custom icon made for right section on navbar as it wasn't as accurate as figma file in heroicons library
const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.fontSize ? props.fontSize : "16"}
      height={props.fontSize ? props.fontSize : "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 5.33337V8.00004L9.33333 9.33337"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.03345 7.33338C2.18284 5.86675 2.86696 4.50645 3.95527 3.51202C5.04358 2.51759 6.45991 1.95864 7.93403 1.9418C9.40815 1.92496 10.8369 2.45142 11.9476 3.42074C13.0584 4.39005 13.7734 5.73436 13.9562 7.1972C14.1391 8.66003 13.777 10.139 12.939 11.3519C12.1011 12.5648 10.8459 13.4267 9.41297 13.7733C7.98006 14.1198 6.46972 13.9267 5.17011 13.2308C3.8705 12.5348 2.87259 11.3848 2.36678 10M2.03345 13.3334V10H5.36678"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HistoryIcon;
