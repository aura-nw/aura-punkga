interface ITag {
  value?: string
  children: React.ReactNode
  selected?: boolean
  onClick?: (value: string) => void
}
const Tag = ({ children, selected, onClick, value }: ITag) => {
  const classes = {
    selected: `h-fit text-subtle-dark rounded-full border-solid px-[12px] bg-primary-color text-[10px] md:text-sm md:leading-4 py-[3px]`,
    unSelected: `h-fit text-medium-gray rounded-full border-solid border-[1px] border-medium-gray px-[12px] text-[10px] md:text-sm md:leading-4 py-[2px]`,
  }
  if (!children) return null
  return (
    <button
      className={`${selected ? classes.selected : classes.unSelected}`}
      onClick={() => onClick && onClick(value)}
      disabled={!onClick}>
      <div className='max-w-[15ch] truncate font-ws' title={children.toString()}>
        {children}
      </div>
    </button>
  )
}

export default Tag
