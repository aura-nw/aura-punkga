import FilledButton from "components/Button/FilledButton"
import OutlineTextField from "components/Input/TextField/Outline"
import Modal from "components/Modal"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { Context } from "src/context"
import SuccessImg from "images/ninja.svg"
import { validatePassword } from "src/utils"
import CheckSquare from "images/icons/check_square_fill.svg"
export default function SettingPasswordModal({ open, setOpen, profile }) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [rePasswordError, setRePasswordError] = useState("")
  const { updateProfile, account } = useContext(Context)
  const [repasswordValidateSuccess, setRepasswordValidateSuccess] = useState(false)

  useEffect(() => {
    setRePasswordError("")
    if (rePassword == newPassword && newPassword) {
      setRepasswordValidateSuccess(true)
    } else {
      setRepasswordValidateSuccess(false)
    }
  }, [rePassword, newPassword])

  const setPasswordHandler = async () => {
    try {
      if (newPassword != rePassword) {
        setRePasswordError("Password doesn’t match")
        return
      }
      if (!validatePassword(newPassword)) {
        setRePasswordError(
          "Password needs to be at least 6 characters long and contain at least one number, one uppercase letter, one lowercase letter and one special character"
        )
        return
      }
      setLoading(true)
      const res = await updateProfile({
        new_password: newPassword,
        confirm_new_password: rePassword,
      })
      if (res) {
        await profile.callApi(true)
        setLoading(false)
        setOpen(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className={`p-6 w-[322px] relative transition-all duration-300 ${success ? "h-[400px]" : ""}`}>
        <div className={` flex flex-col gap-3 transition-all duration-300 ${success ? "opacity-0" : "opacity-100"}`}>
          <p className="text-center text-xl leading-6 font-semibold">Set password</p>
          <OutlineTextField
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            type="password"
            placeholder="Enter new password"
          />
          <OutlineTextField
            label="Confirm new password"
            value={rePassword}
            onChange={setRePassword}
            type="password"
            errorMsg={rePasswordError}
            placeholder="Re-Enter new password"
            trailingComponent={repasswordValidateSuccess ? <Image src={CheckSquare} alt="" /> : null}
          />
          <FilledButton
            disabled={!newPassword || !rePassword}
            className="mt-2 mx-auto"
            size="lg"
            loading={loading}
            onClick={setPasswordHandler}>
            Confirm
          </FilledButton>
        </div>
        <div
          className={`absolute inset-0 py-6 px-4 flex flex-col gap-3 transition-all duration-300 ${
            success ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <p className="text-center text-xl leading-6 font-semibold">Successful password set up!</p>
          <Image src={SuccessImg} alt="" className="mx-auto" />
          <p className="text-sm leading-6 font-medium text-center w-[246px] mx-auto">
            You can now use the new password to sign in to your account
          </p>
          <FilledButton
            className="mt-2 mx-auto"
            size="lg"
            onClick={() => {
              setOpen(false)
              setSuccess(false)
            }}>
            Explore
          </FilledButton>
        </div>
      </div>
    </Modal>
  )
}
