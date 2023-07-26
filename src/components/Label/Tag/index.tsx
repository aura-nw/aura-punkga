interface ITag {
  value?: string
  children: React.ReactNode
  selected?: boolean
  onClick?: (value: string) => void
}
const Tag = ({ children, selected, onClick, value }: ITag) => {
  const classes = {
    selected: `h-fit text-subtle-dark rounded-full border-solid px-[12px] bg-primary-color text-[10px] md:text-base`,
    unSelected: `h-fit text-medium-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px] md:leading-[22px] text-[10px] md:text-base`,
  }
  return (
    <button
      className={`${selected ? classes.selected : classes.unSelected} ${
        JSON.stringify(children).length > 15 ? 'animation-tag' : ''
      }`}
      onClick={() => onClick && onClick(value)}
      disabled={!onClick}>
      <div>{children}</div>
    </button>
  )
}

export default Tag
