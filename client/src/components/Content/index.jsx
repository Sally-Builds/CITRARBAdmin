import React from "react";

const index = ({ children }) => {
  return (
    <>
      <div className="col-span-12 md:col-span-12 p-4 h-[calc(100vh-3.75rem)]">
        {children}
      </div>
    </>
  );
};

export default index;
