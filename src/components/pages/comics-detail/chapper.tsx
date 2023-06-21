import { EyeIcon } from "@heroicons/react/20/solid";
import { Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import ic_outline_heart from "src/assets/images/icons/ic_outline_heart.svg";

interface IChapper {
  image: any;
  name: string;
  status: string;
  chapper: string;
  description: string;
  tags: string[];
  views: number;
  likes: number;
  latestChap: number;
}

function Chapper(props: IChapper) {
  return (
    <>
      <div className="flex gap-[20px]">
        <div className="flex-auto w-[8%]">
          <Image
            src={props.image}
            alt=""
            className="rounded-[15px] h-[120px] w-[120px]"
          />
        </div>
        <div className="flex-auto w-2/3 flex flex-col justify-between">
          <div>
            <div className="font-[500]">{props.chapper}</div>
            <div className="font-bold text-[18px]">{props.name}</div>
          </div>
          <div>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-14">
                <div>24/11/2019</div>
                <div className="flex items-center text-medium-gray">
                  <EyeIcon className="w-5 inline mr-1" /> {props.views}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconButton
                  aria-label="fingerprint"
                  color="success"
                  className="p-0"
                >
                  <Image className="" src={ic_outline_heart} alt="heart" />
                </IconButton>
                <p className="text-second-color font-medium">{props.likes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-4"/>
    </>
  );
}

export default Chapper;
