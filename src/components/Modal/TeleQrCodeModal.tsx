import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import { getTeleQrCode } from 'src/services'
export default function TeleQrCodeModal() {
  const [qrCode, setQrCode] = useState()
  const canvasRef = useRef<any>()
  useEffect(() => {
    fetchQrCode()
  }, [])
  const fetchQrCode = async () => {
    try {
      const res = await getTeleQrCode()
      if (res.data) {
        QRCode.toCanvas(canvasRef.current, res.data, {
          width: 222,
        })
      }
    } catch (error) {}
  }
  return (
    <div className={` py-6 px-8 flex flex-col gap-8 w-full max-w-[670px]`}>
      <div className='flex items-center flex-col'>
        <canvas ref={canvasRef} />
        <div className='text-sm text-center font-semibold mt-8'>Link PunkgaMe Telegram app by QR code</div>
        <p className='text-sm font-medium mt-4'>
          1. Open PunkgaMe Application on Telegram
          <br />
          2. Select Account and press button <span className='text-text-info-primary font-semibold'>
            Link Punkga
          </span>{' '}
          <br />
          3. Point you phone at this screen and scan to confirm login
        </p>
      </div>
    </div>
  )
}
