import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import TextField from "components/Input/TextField";
import Select from "components/Select";
import Image from "next/image";
import ic_note from "src/assets/images/icons/ic_note.svg";
import Chapper from "./chapper";
import NoData from "./noData";

interface IListChappers {
  data: any;
}
function ListChappers({ data }: IListChappers) {
  return (
    <>
      <div className="h-[62px] items-center flex gap-2 bg-light-medium-gray p-10">
        <p className="font-semibold">223 chappers</p>
        <div>
          <TextField
            placeholder="Enter chapter number"
            leadingComponent={<Image src={ic_note} alt="" />}
          />
        </div>
        <div>
          <Select
            icon={
              <ChevronDownIcon
                className="h-5 w-5 text-medium-gray"
                aria-hidden="true"
              />
            }
            options={[
              {
                key: 1,
                value: "Wade Cooper",
              },
              {
                key: 2,
                value: "Arlene Mccoy",
              },
              {
                key: 3,
                value: "Devon Webb",
              },
            ]}
            placeholder="All types"
          />
        </div>
        <div>
          <Select
            icon={
              <ArrowsUpDownIcon
                className="h-5 w-5 text-medium-gray"
                aria-hidden="true"
              />
            }
            options={[
              {
                key: 1,
                value: "Wade Cooper",
              },
              {
                key: 2,
                value: "Arlene Mccoy",
              },
              {
                key: 3,
                value: "Devon Webb",
              },
            ]}
            placeholder="Sort by newest"
          />
        </div>
      </div>
      {data.length > 0 ? (
        <div className="pt-10 pl-24">
          {data.map((data, index) => {
            return <Chapper key={index} {...data} />;
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

export default ListChappers;
