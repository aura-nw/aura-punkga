interface IStatusLabel {
  status: "warning" | "success" | "error"
  children: JSX.Element | string
}
export default function StatusLabel({ status, children }: IStatusLabel) {
  const classes = {
    warning: "text-[#EEB304] bg-[#FFF2D1]",
    success: "text-[#1FAB5E] bg-[#C6FFDE]",
    error: "text-[#FF5C00] bg-[#FFD9DA]",
  }
  return (
    <span className={`rounded-[6px] font-bold px-[8px] pb-[1px] text-[14px] leading-[24px] ${classes[status]} inline-flex items-center`}>
      {children}
    </span>
  )
}
