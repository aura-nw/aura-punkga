export default function DummyComicDetail() {
  return (
    <div className={`z-[1] absolute top-0 bottom-0 left-0 right-0 flex justify-end animate-pulse`}>
      <div className={`relative flex-auto h-full bg-white z-0 opacity-0 w-2/3`}></div>
      <div className={`relative flex-auto bg-light-gray h-full overflow-auto w-1/3 p-3`}>
        <div className={`h-[160px] object-cover w-full bg-light-medium-gray rounded-2xl`} />
        <div className="px-[60px] flex flex-col gap-[10px]">
          <div className={` mt-[-44px] flex gap-5`}>
            <div className={`w-[120px] h-[160px] object-cover rounded-[15px] overflow-hidden bg-medium-gray`} />
            <div className="flex-1 flex flex-col justify-end gap-[10px]">
              <div className="w-1/2 h-6 bg-light-medium-gray rounded-md"></div>
              <div className="flex gap-3">
                <div className="w-1/3 h-4 bg-light-medium-gray rounded-md"></div>
                <div className="w-1/3 h-4 bg-light-medium-gray rounded-md"></div>
              </div>
              <div className="w-1/2 h-5 bg-light-medium-gray rounded-md"></div>
            </div>
          </div>
          <div className="h-4 w-2/3 bg-light-medium-gray rounded-md"></div>
          <div className="h-16 w-full bg-light-medium-gray rounded-md"></div>
          <div className="flex gap-3">
            <div className="w-1/6 h-4 bg-light-medium-gray rounded-md"></div>
            <div className="w-1/6 h-4 bg-light-medium-gray rounded-md"></div>
          </div>
        </div>
        <div className="flex gap-1">
          <div className={`flex-auto  w-full -mr-1`}>
            <div className="w-full bg-medium-gray px-[60px] py-[16px] flex items-center justify-between mt-[13px]"></div>
            <div className="px-[60px] py-[20px] flex flex-col gap-5">
              {Array.apply(null, Array(4)).map((v,i) => (
                <div key={i} className="h-24 w-full bg-light-medium-gray rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
