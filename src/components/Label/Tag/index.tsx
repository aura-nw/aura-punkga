interface ITag {
  value?: string
  children: React.ReactNode
  selected?: boolean
  onClick?: (value: string) => void
}
const Tag = ({ children, selected, onClick, value }: ITag) => {
  const classes = {
    selected: `h-fit text-subtle-dark rounded-full border-solid px-[12px] bg-primary-color`,
    unSelected: `h-fit text-medium-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px] leading-[22px]`,
  }

  return (
    <button
      className={selected ? classes.selected : classes.unSelected}
      onClick={() => onClick && onClick(value)}
      disabled={!onClick}>
      {children}
    </button>
  )
}

export default Tag
