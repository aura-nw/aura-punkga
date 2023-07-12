import Header from "components/Header"
import { useRouter } from "next/router"
import { forwardRef, useContext, useEffect, useState } from "react"
import { Context } from "src/context"
import NoImg from "images/no_img.png"
import Image from "next/image"
import OutlineButton from "components/Button/OutlineButton"
import DummyComic from "components/DummyComponent/comic"
import Comic from "components/pages/profile/comic"
import Select from "components/Select"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import AutoGrowingTextField from "components/Input/TextField/AutoGrowing"
export default function Profile({ profile, subscribeList, unsubscribe, subscribe }) {
  const { account, isSettingUp } = useContext(Context)
  const [startDate, setStartDate] = useState(new Date("01/18/1999"))
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isSettingUp) {
      if (!account) {
        router.push("/")
      }
    }
  }, [isSettingUp, account])
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      className="relative w-full cursor-default rounded-[12px] bg-white py-[3px] pl-[13px] pr-[57px] text-left text-gray-900 shadow-sm ring-1 ring-inset ring-medium-gray focus:outline-none focus:ring-2 sm:text-sm sm:leading-6 lg:h-10 text-medium-gray font-bold"
      onClick={onClick}
      ref={ref}>
      {value}
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <ChevronDownIcon className="h-5 w-5 text-medium-gray" aria-hidden="true" />
      </span>
    </button>
  ))
  return (
    <>
      <Header />
      <div className="pk-container py-5">
        {isSettingUp || profile.loading ? (
          <div className="flex gap-[60px]">
            <div className="w-[320px] h-[320px] rounded-xl object-cover bg-light-gray animate-pulse"></div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="h-10 animate-pulse bg-light-gray text-second-color mb-4 w-2/3"></p>
                <p className="h-4 animate-pulse bg-light-gray text-second-color mb-4 w-3/4"></p>
                <div className="flex gap-[30px] font-medium mb-5">
                  <p className="h-4 animate-pulse bg-light-gray text-second-color mb-4 w-1/2"></p>
                  <p className="h-4 animate-pulse bg-light-gray text-second-color mb-4 w-1/2"></p>
                </div>
                <div className="w-[20vw] animate-pulse h-24 bg-light-gray"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-[60px]">
            <div className="w-[320px] h-[320px] rounded-xl object-cover bg-light-gray">
              <Image src={NoImg} height={360} width={360} alt="" />
            </div>
            <div className="flex flex-col justify-between flex-auto">
              <div>
                <div className="flex">
                  <div
                    className={`inline-block text-medium-gray transition-all  ${
                      open ? "w-[100px] opacity-100 font-bold" : "w-[0px] opacity-0"
                    }`}>
                    Username:
                  </div>
                  <p
                    className={` text-second-color transition-all ${
                      open ? "text-base font-bold mb-0" : "text-[32px] leading-10 font-extrabold  mb-4 "
                    }`}>
                    {profile.data.nickname}
                  </p>
                </div>
                <div className="flex">
                  <div
                    className={`inline-block text-medium-gray transition-all  ${
                      open ? "w-[100px] opacity-100 font-bold" : "w-[0px] opacity-0"
                    }`}>
                    Email:
                  </div>
                  <p
                    className={` text-second-color transition-all ${
                      open ? "text-base font-bold mb-0" : "font-medium  mb-2"
                    }`}>
                    {profile.data.email}
                  </p>
                </div>

                {(!!profile.data.birthdate || true) && (
                  <>
                    <div
                      className={`flex flex-col gap-4 font-medium transition-all ${
                        !open ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100 h-24 mb-2 mt-2"
                      }`}>
                      {true && (
                        <div className="flex items-center">
                          <div
                            className={`inline-block text-medium-gray transition-all  ${
                              open ? "w-[100px] opacity-100 font-bold" : "w-[0px] opacity-0"
                            }`}>
                            DOB:
                          </div>
                          <div>
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              customInput={<CustomInput />}
                              dateFormat="dd/MM/yyyy"
                            />
                          </div>
                        </div>
                      )}
                      {true && (
                        <div className="flex items-center">
                          <div
                            className={`inline-block text-medium-gray transition-all  ${
                              open ? "w-[100px] opacity-100 font-bold" : "w-[0px] opacity-0"
                            }`}>
                            Gender:
                          </div>
                          <div>
                            <Select
                              placeholder="Select a gender"
                              icon={<ChevronDownIcon className="h-5 w-5 text-medium-gray" aria-hidden="true" />}
                              options={[
                                {
                                  key: 1,
                                  value: "Male",
                                },
                                {
                                  key: 2,
                                  value: "Female",
                                },
                                {
                                  key: 3,
                                  value: "Other",
                                },
                              ]}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex gap-[30px] font-medium  transition-all ${
                        open ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100 h-6 mb-2"
                      }`}>
                      {true && <div>{profile.data.birthdate || "18/01/1999"}</div>}
                      {true && <div>{profile.data.gender || "Male"}</div>}
                    </div>
                  </>
                )}
                <div
                  className={`font-medium transition-all overflow-hidden ${
                    open ? "opacity-0 h-0" : "opacity-100 h-[80px]"
                  }`}>
                  <label className="text-medium-gray">Bio:</label>
                  <p>A pink monster comes from a green bubble planet</p>
                </div>
                <div
                  className={`flex transition-all mt-2 overflow-hidden ${
                    !open ? "opacity-0 h-0 " : "opacity-100 h-[80px]"
                  }`}>
                  <label className="text-medium-gray font-bold min-w-[100px] flex-auto pt-[7px]">Bio:</label>
                  <AutoGrowingTextField
                    placeholder="Write something about yourself "
                    className="text-sm font-bold leading-6"
                  />
                </div>
              </div>
              <div className="relative">
                <div
                  className={`flex gap-6 absolute bottom-0 transition-all ${
                    open ? "left-1/2 -translate-x-1/2 opacity-0" : "left-[0%] opacity-100"
                  }`}>
                  <OutlineButton size="lg" onClick={() => setOpen(!open)}>
                    Edit profile
                  </OutlineButton>
                  <OutlineButton size="lg">Change password</OutlineButton>
                </div>
                <div
                  className={`flex gap-6 absolute bottom-0 transition-all ${
                    open ? "right-[0%]  opacity-100" : "right-1/2 opacity-0 translate-x-1/2"
                  }`}>
                  <OutlineButton size="lg" onClick={() => setOpen(!open)}>
                    Save
                  </OutlineButton>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-[100px]">
          <p className="text-2xl leading-6 font-extrabold mb-10">Currently reading</p>
          <div className="grid gap-x-24 gap-y-10 grid-cols-3">
            {isSettingUp ? (
              <>
                <DummyComic />
                <DummyComic />
                <DummyComic />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="mt-[100px]">
          <p className="text-2xl leading-6 font-extrabold mb-10">Subscribe list</p>
          <div className="grid gap-x-24 gap-y-10 grid-cols-3">
            {isSettingUp || subscribeList.loading ? (
              <>
                <DummyComic />
                <DummyComic />
                <DummyComic />
              </>
            ) : (
              <>
                {subscribeList.data?.map((data, index) => (
                  <Comic
                    key={index}
                    {...data}
                    unsubscribe={() => unsubscribe(data.id)}
                    subscribe={() => subscribe(data.id)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
