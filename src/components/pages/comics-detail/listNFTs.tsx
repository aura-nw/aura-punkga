import NFTCard from "./nftCard";
import NoData from "./noData";

interface IListNFTs {
  data: any;
}

function ListNFTs({ data }: IListNFTs) {
  return (
    <>
      <div className="h-[62px] items-center justify-center flex font-semibold bg-light-medium-gray p-10">
        Hero Cyberpunk’s NFTs
      </div>
      {data.length > 0 ? (
        <div className="flex flex-wrap justify-around">
          {data.map((data, index) => {
            return <NFTCard key={index} {...data} />;
          })}
        </div>
      ) : (
        <div className="pt-10 mb-10">
          <NoData />
        </div>
      )}
    </>
  );
}

export default ListNFTs;
