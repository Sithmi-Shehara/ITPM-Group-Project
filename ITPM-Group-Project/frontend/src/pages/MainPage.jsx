import React from "react";

import TopBar from "../componants/Dashboard/TopBar";
import SideBar from "../componants/Dashboard/SideBar";
import NavigationArea from "../componants/Dashboard/NavigationArea";

function MainPage() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-red-100">
      <TopBar />

      <div className="flex flex-1">
        <SideBar />

        <main className="flex-1 p-4 overflow-y-auto">
          <NavigationArea />
        </main>
      </div>
    </div>
  );
}

export default MainPage;
