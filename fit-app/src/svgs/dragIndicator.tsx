import React from "react";

function DragIndicatorSvg() {
  return (
    <svg className="text-current"  viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M9.707 5.707a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 4.414V11h6.586l-1.293-1.293a1 1 0 011.414-1.414l2.999 2.998c.387.386.387 1.03.001 1.416l-3 3a1 1 0 01-1.414-1.414L19.586 13H13v6.586l1.293-1.293a1 1 0 011.414 1.414l-2.998 2.998-.017.017a1.01 1.01 0 01-1.4-.015l-3-3a1 1 0 111.415-1.414L11 19.586V13H4.414l1.293 1.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L4.414 11H11V4.414L9.707 5.707z"
      ></path>
    </svg>
  );
}

export default DragIndicatorSvg;
