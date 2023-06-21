import classes from './comic.module.scss'

export const withCssModule = (Component: React.FC<any>) => (props: any) => {
  return (
    <Component
      {...props}
      classes={classes}
    />
  )
}