interface IStatusLabel {
  status: string
  children: JSX.Element | string
}
export default function StatusLabel({ status, children }: IStatusLabel) {
  const classes = {
    warning: "text-medium-yellow bg-light-yellow",
    success: "text-medium-green bg-light-green",
    error: "text-medium-red bg-light-red",
  }
  return (
    <span
      className={`rounded-[6px] font-bold px-[8px] pb-[1px] md:text-[14px] text-[10px] md:leading-[24px] ${classes[status]} inline-flex items-center`}>
      {children}
    </span>
  )
}
