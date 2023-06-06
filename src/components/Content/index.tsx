interface ContentProps {}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <div className="page-content">{children}</div>;
};

export default Content;
