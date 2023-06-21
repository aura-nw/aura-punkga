import MockupImage from "src/assets/images/mockup4.png";
import NFTCard from "./nftCard";

const mockupData = [
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

function ListNFTs() {
  return (
    <>
      <div className="h-[62px] items-center justify-center flex font-semibold bg-light-medium-gray p-10">
        Hero Cyberpunk’s NFTs
      </div>
      <div className="flex flex-wrap justify-around">
        {mockupData.map((data, index) => {
          return <NFTCard key={index} {...data} />;
        })}
      </div>
    </>
  );
}

export default ListNFTs;
