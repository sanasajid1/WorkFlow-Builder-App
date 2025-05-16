import React from "react";

//this is a custom icon made for builder tab since it wasn't as accurate as figma file in heroicons library
const PencilSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M7.33341 3.33336H4.00008C3.64646 3.33336 3.30732 3.47384 3.05727 3.72388C2.80722 3.97393 2.66675 4.31307 2.66675 4.66669V12C2.66675 12.3536 2.80722 12.6928 3.05727 12.9428C3.30732 13.1929 3.64646 13.3334 4.00008 13.3334H11.3334C11.687 13.3334 12.0262 13.1929 12.2762 12.9428C12.5263 12.6928 12.6667 12.3536 12.6667 12V8.66669M11.7241 2.39069C11.8471 2.26335 11.9942 2.16177 12.1569 2.09189C12.3195 2.02201 12.4945 1.98523 12.6715 1.98369C12.8486 1.98215 13.0242 2.01589 13.188 2.08293C13.3519 2.14997 13.5008 2.24898 13.6259 2.37417C13.7511 2.49936 13.8501 2.64823 13.9172 2.81209C13.9842 2.97595 14.018 3.15152 14.0164 3.32856C14.0149 3.5056 13.9781 3.68056 13.9082 3.84323C13.8383 4.0059 13.7368 4.15303 13.6094 4.27603L7.88541 10H6.00008V8.11469L11.7241 2.39069Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilSquareIcon;
