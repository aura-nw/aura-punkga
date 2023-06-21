import Image from "next/image";
import img_no_data from "src/assets/images/img_no-data.svg";

function NoData() {
  return (
    <div className="flex flex-col items-center">
      <Image src={img_no_data} alt="no-data" />
      <p className="font-extrabold text-2xl text-medium-gray">Artist Composing</p>
    </div>
  );
}

export default NoData;
