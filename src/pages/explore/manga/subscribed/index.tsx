import SubscribedManga from "./SubscribedManga";

export default function Page(props) {
  if (props.justHead) {
    return <></>;
  }
  return <SubscribedManga />;
}
