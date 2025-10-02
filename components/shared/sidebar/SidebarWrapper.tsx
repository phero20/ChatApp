
import React from "react";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";



const SidebarWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4">
      {/* <Authenticated> */}
        <MobileNav />
        <DesktopNav />
      {/* </Authenticated> */}

      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
