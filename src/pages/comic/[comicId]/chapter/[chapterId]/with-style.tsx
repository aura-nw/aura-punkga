const styles = {
  background: {
    backgroundColor: "var(--light-gray)",
    height: "100%",
  },
}
const withStyle = (Component: React.FC<any>) => (props: any) => {
  return <Component {...props} styles={styles} />
}
export default withStyle
