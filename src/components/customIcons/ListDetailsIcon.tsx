import React from "react";

//this is a custom icon made for execution logs tab since it wasn't as accurate as figma file in heroicons library
const ListDetailsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M8.66675 3.33337H14.0001"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66675 6H12.0001"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66675 10H14.0001"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66675 12.6666H12.0001"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 3.33329C2 3.15648 2.07024 2.98691 2.19526 2.86189C2.32029 2.73686 2.48986 2.66663 2.66667 2.66663H5.33333C5.51014 2.66663 5.67971 2.73686 5.80474 2.86189C5.92976 2.98691 6 3.15648 6 3.33329V5.99996C6 6.17677 5.92976 6.34634 5.80474 6.47136C5.67971 6.59639 5.51014 6.66663 5.33333 6.66663H2.66667C2.48986 6.66663 2.32029 6.59639 2.19526 6.47136C2.07024 6.34634 2 6.17677 2 5.99996V3.33329Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 10C2 9.82323 2.07024 9.65366 2.19526 9.52864C2.32029 9.40361 2.48986 9.33337 2.66667 9.33337H5.33333C5.51014 9.33337 5.67971 9.40361 5.80474 9.52864C5.92976 9.65366 6 9.82323 6 10V12.6667C6 12.8435 5.92976 13.0131 5.80474 13.1381C5.67971 13.2631 5.51014 13.3334 5.33333 13.3334H2.66667C2.48986 13.3334 2.32029 13.2631 2.19526 13.1381C2.07024 13.0131 2 12.8435 2 12.6667V10Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListDetailsIcon;
