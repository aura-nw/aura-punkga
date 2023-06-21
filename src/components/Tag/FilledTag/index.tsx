interface IFilledTag {
  children: React.ReactNode;
}

function FilledTag({children}: IFilledTag) {
  return <div className="h-[24px] px-3 rounded-md leading-6 text-second-color text-sm font-bold bg-light-green">{children}</div>;
}

export default FilledTag;
