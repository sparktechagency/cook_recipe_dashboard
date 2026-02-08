import React, { useState } from "react";

import Adds from "./Adds";
import VideosAdd from "./VideosAdd";
import AddPromotionModal from "./AddPromotionModal";
import EditPromotionModal from "./EditPromotionModal";
import Navigate from "../../Navigate";


const AdPromotional = () => {
  const [selectedTab, setSelectedTab] = useState("personal");
 
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <div className="p-1 h-screen">
      <div className="flex justify-between">
        <div className="flex ">
          <Navigate title={"Promotion"}></Navigate>
       
        </div>
        <button
        onClick={() => setOpenAddModal(true)}
          className="bg-[#495F48] px-5 py-2 text-white rounded"
          // onClick={() => setOpenAddModal(true)}
        >
          + Add Promotion
        </button>
      </div>
    
     
          <Adds ></Adds>
      
      


      <AddPromotionModal setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}></AddPromotionModal>
        
    </div>
  );
};

export default AdPromotional;
