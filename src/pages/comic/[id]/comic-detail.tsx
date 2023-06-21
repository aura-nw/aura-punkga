import Chip from "components/Chip";
import StatusLabel from "components/Label/Status";
import ListChappers from "components/pages/comics-detail/listChappers";
import ListNFTs from "components/pages/comics-detail/listNFTs";
import Image from "next/image";
import React, { useState } from "react";
import ic_calendar from "src/assets/images/icons/ic_calendar.svg";
import mockBanner from "src/assets/images/mockup3.png";
import mockAvar from "src/assets/images/mockup4.png";
import MockupImage from "src/assets/images/mockup4.png";

const mockupData = [
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
  {
    image: MockupImage,
    name: "This is the chapter name#233",
    status: "ongoing",
    chapper: "Chapter 231",
    tags: ["Hi-tech", "Low-Life"],
    views: 1000,
    likes: 1000,
    description:
      "Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi xem trộm giải đấu Cyber-Soccer, cậu đã đăng ký một cuộc thi ...",
    latestChap: 123,
  },
];

const mockupDataNft = [
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
  {
    image: MockupImage,
    avatar: MockupImage,
    name: "This is the chapter name#233",
    mangaName: "ongoing",
    createdBy: "Chapter 231",
  },
];

const ComicDetail: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  const [selectedChip, setSelectedChip] = useState<string>("vn");

  const handleChipClick = (value: string) => {
    setSelectedChip(value);
  };
  const { tags, status } = data;
  return (
    <div className="pk-container">
      <div style={styles.background}>
        <Image className="h-[280px]" src={mockBanner} alt="" />
        <div className=" mt-[-175px] ml-[60px] transform flex flex-col gap-2">
          <div className="flex items-end">
            <Image
              src={mockAvar}
              alt="Avatar"
              className="h-80 w-60 rounded-lg"
            />
            <div className="ml-4 align-bottom flex flex-col gap-2.5">
              <div className="flex gap-4 items-center">
                <p className="text-2xl font-extrabold">Hero Cyberpunk </p>
                <StatusLabel status={status} />
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
                  <Chip disabled key={i}>
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="font-normal text-base text-gray">Release date:</p>
            <p className="font-semibold text-base text-gray">24/11/2022</p>
          </div>
          <div className="flex gap-2">
            <Image src={ic_calendar} alt="" />
            <p className="font-semibold text-base text-second-color">
              New chapter arrives on Monday, 22/06/2023. Don’t miss latest
              update, subscribe now!
            </p>
          </div>
          <div className="pr-8">
            <p>
              Main hack được một năng lực cực mạnh tên là Dark Force. Trong khi
              tham gia xem trộm giải đấu Cyber-Soccer cậu vô tình biết và đã
              đăng ký một cuộc thi tuyển chọn siêu anh hùng dành riêng cho thành
              phố ngầm được tài trợ bởi một tập đoàn công nghệ với mong muốn
              được đến EVO-city. Trong quá trình tham gia thi tuyển toàn bộ ban
              tổ chức và cuộc thi đã bị tấn công bởi những tên tội phạm ngầm với
              mục đích nhằm chiếm đoạt...
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <Chip value="en" selected={selectedChip} onClick={handleChipClick}>
              English
            </Chip>
            <Chip value="vn" selected={selectedChip} onClick={handleChipClick}>
              Vietnamese
            </Chip>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className=" w-[53%]">
            <ListChappers data={mockupData} />
          </div>
          <div className="w-[46%]">
            <ListNFTs data={mockupDataNft} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComicDetail;
