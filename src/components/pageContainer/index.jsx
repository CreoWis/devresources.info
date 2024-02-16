import React from "react";

const PageContainer = ({ children }) => {
  return (
    <main className="max-w-[1400px] m-auto min-h-[750px] pt-[46px] sm:pt-[64px] lg:pt-[84px]">
      {children}
    </main>
  );
};

export default PageContainer;
