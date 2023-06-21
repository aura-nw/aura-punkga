import React from "react";

interface IOutlineTag {
  children: React.ReactNode;
}

function OutlineTag({ children }: IOutlineTag) {
  return (
    <div className="h-[24px] leading-6 text-medium-gray text-sm border border-medium-gray rounded-[20px] px-3">
      {children}
    </div>
  );
}

export default OutlineTag;
