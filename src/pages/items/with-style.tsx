const styles = {
  container: {
    backgroundColor: 'red'
  }
}

export const withStyle = (Component: React.FC<any>) => (props: any) => {
  return (
    <Component
      {...props}
      styles={styles}
    />
  )
}