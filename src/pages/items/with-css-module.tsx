import classes from './items.module.scss'

export const withCssModule = (Component: React.FC<any>) => (props: any) => {
  return (
    <Component
      {...props}
      classes={classes}
    />
  )
}