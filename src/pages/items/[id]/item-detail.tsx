import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';


const ListCampaigns: NextPage = () => {
    const router = useRouter();
    const itemId = router.query.id;
  return (
        <div>
          <div className="flex justify-between items-center mb-4 px-4">
           
           this is item {itemId}
          </div>
         
        </div>
      
  );
};

export default ListCampaigns;