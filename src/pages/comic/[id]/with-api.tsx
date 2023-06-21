import { useEffect, useState } from "react";

export const withApi = (Component: React.FC<any>) => (props: any) => {
  const [tags, setTags] = useState<string[]>([
    "Low-Life",
    "Hi-tech",
    "Shonen 18+",
  ]);
  const [status, setStatus] = useState<string>('finished');


  const onUpdate = () => {};

  useEffect(() => {
    // fetch api then store to stage object
  }, []);

  return <Component {...props} data={{tags, status}} onUpdate={onUpdate} />;
};
