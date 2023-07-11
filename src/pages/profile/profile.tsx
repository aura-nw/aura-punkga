import Header from "components/Header"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { Context } from "src/context"
import NoImg from "images/no_img.png"
import Image from "next/image"
import OutlineButton from "components/Button/OutlineButton"
import DummyComic from "components/DummyComponent/comic"
export default function Profile({ profile }) {
  const { account, isSettingUp } = useContext(Context)
  const router = useRouter()

  useEffect(() => {
    if (!isSettingUp) {
      if (!account) {
        router.push("/")
      }
    }
  }, [isSettingUp])
  return (
    <>
      <Header />
      {isSettingUp || profile.loading ? (
        <div>Loading</div>
      ) : (
        <div className="pk-container py-5">
          <div className="flex gap-[60px]">
            <div className="w-[320px] h-[320px] rounded-xl object-cover bg-light-gray">
              <Image src={NoImg} height={360} width={360} alt="" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[32px] leading-10 text-second-color font-extrabold mb-4">{profile.data.nickname}</p>
                <p className="text-second-color font-medium mb-2">{profile.data.email}</p>
                {(!!profile.data.birthdate || !!profile.data.gender) && (
                  <div className="flex gap-[30px] font-medium mb-5">
                    {!!profile.data.birthdate && <div>{profile.data.birthdate}</div>}
                    {!!profile.data.gender && <div>{profile.data.gender}</div>}
                  </div>
                )}
                <div className="font-medium">
                  <label className="text-medium-gray">Bio:</label>
                  <p>A pink monster comes from a green bubble planet</p>
                </div>
              </div>
              <div className="flex gap-6">
                <OutlineButton>Edit profile</OutlineButton>
                <OutlineButton>Change password</OutlineButton>
              </div>
            </div>
          </div>
          <div className="mt-[100px]">
            <p className="text-2xl leading-6 font-extrabold mb-10">Currently reading</p>
            <div className="grid gap-x-24 gap-y-10 grid-cols-3">
              <DummyComic />
              <DummyComic />
              <DummyComic />
              <DummyComic />
            </div>
          </div>
          <div className="mt-[100px]">
            <p className="text-2xl leading-6 font-extrabold mb-10">Subscribe list</p>
            <div className="grid gap-x-24 gap-y-10 grid-cols-3">
              <DummyComic />
              <DummyComic />
              <DummyComic />
              <DummyComic />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
