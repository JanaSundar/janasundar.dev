import React from 'react';

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <rect width="16" height="16" x="4" y="5" rx="2"></rect>
      <path d="M16 3L16 7"></path>
      <path d="M8 3L8 7"></path>
      <path d="M4 11L20 11"></path>
      <path d="M11 15L12 15"></path>
      <path d="M12 15L12 18"></path>
    </svg>
  );
}

export default CalendarIcon;
