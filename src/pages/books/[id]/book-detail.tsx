import FilledTag from "components/Tag/FilledTag";
import OutlineTag from "components/Tag/OutlineTag";
import Image from "next/image";
import React from "react";
import mockBanner from "src/assets/images/mockup3.png";
import mockAvar from "src/assets/images/mockup4.png";

const BookDetail: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  const { tags, status } = data;
  return (
    <div className="px-24">
      <div>
        <div className="relative">
          <Image className="h-[280px]" src={mockBanner} alt="" />
          <div className="absolute top-[40%] left-[60px] transform ">
            <div className="flex items-end">
              <Image
                src={mockAvar}
                alt="Avatar"
                className="h-80 w-60 rounded-lg"
              />
              <div className="ml-4 align-bottom flex flex-col gap-2.5">
                <div className="flex gap-4 items-center">
                  <p className="text-2xl font-extrabold">Hero Cyberpunk </p>
                  <FilledTag>{status}</FilledTag>
                </div>
                <p className="text-xl font-semibold text-second-color">Hanz</p>
                <div className="flex gap-2.5">
                  <div className="flex">
                    <p className="text-base font-semibold text-gray">1,234</p>
                    <p className="text-base font-semibold text-medium-gray ml-1">
                      views
                    </p>
                  </div>
                  -
                  <div className="flex">
                    <p className="text-base font-semibold text-gray">1,234</p>
                    <p className="text-base font-semibold text-medium-gray ml-1">
                      likes
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  {tags.map((tag, i) => (
                    <OutlineTag key={i}>{tag}</OutlineTag>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <p className="font-normal text-base text-gray">Release date:</p>
              <p className="font-semibold text-base text-gray">24/11/2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;
