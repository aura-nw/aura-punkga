import classes from "./chapter.module.scss"

const withCssModule = (Component: React.FC<any>) => (props: any) => {
  return <Component {...props} classes={classes} />
}

export default withCssModule
