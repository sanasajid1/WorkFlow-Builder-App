import React from "react";

//this is a custom icon made for right section on navbar as it wasn't as accurate as figma file in heroicons library
const SearchBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.fontSize ? props.fontSize : "14"}
      height={props.fontSize ? props.fontSize : "14"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 13L9 9M10.3333 5.66667C10.3333 6.2795 10.2126 6.88634 9.97811 7.45252C9.74358 8.01871 9.39984 8.53316 8.9665 8.9665C8.53316 9.39984 8.01871 9.74358 7.45252 9.97811C6.88634 10.2126 6.2795 10.3333 5.66667 10.3333C5.05383 10.3333 4.447 10.2126 3.88081 9.97811C3.31462 9.74358 2.80018 9.39984 2.36683 8.9665C1.93349 8.53316 1.58975 8.01871 1.35523 7.45252C1.12071 6.88634 1 6.2795 1 5.66667C1 4.42899 1.49167 3.242 2.36683 2.36683C3.242 1.49167 4.42899 1 5.66667 1C6.90434 1 8.09133 1.49167 8.9665 2.36683C9.84167 3.242 10.3333 4.42899 10.3333 5.66667Z"
        stroke={props.stroke ? props.stroke : "#6B7280"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchBarIcon;
