import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";

interface INFT {
  image: any;
  avatar: any;
  name: string;
  mangaName: string;
  createdBy: string;
}

function NFTCard(props: INFT) {
  return (
    <Card className="rounded-[20px] mt-10" sx={{ height: 390, width: 270 }}>
      <CardMedia className="p-2" component="picture" title="green iguana">
        <Image className="w-full h-[250px]" src={props.image} alt="logo" />
      </CardMedia>
      <CardContent className="flex flex-col justify-between p-3">
        <p>{props.name}</p>
        <p className="text-second-color">{props.mangaName}</p>
      </CardContent>
      <CardActions>
        <div className="flex items-center gap-2">
          <Image
            className="w-[24px] h-[24px] rounded-[50%]"
            src={props.image}
            alt="logo"
          />
          <p className="text-second-color">Created by</p>
          <p className="text-second-color font-bold">{props.createdBy}</p>
        </div>
      </CardActions>
    </Card>
  );
}

export default NFTCard;
