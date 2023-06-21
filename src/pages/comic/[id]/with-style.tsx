const styles = {
    background: {
      backgroundColor: 'var(--light-gray)',
      height: '100%'
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