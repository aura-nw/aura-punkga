import { useEffect, useState } from "react"


export const withApi = (Component: React.FC<any>) => (props: any) => {
  const [data, setData] = useState({
    a: 1
  })

  const onUpdate = () => {
    // update with api
    setData({
      a: 2
    })
  }

  useEffect(() => {
    // fetch api then store to stage object
  }, [])

  return (
    <Component
      {...props}
      data={data}
      onUpdate={onUpdate}
    />
  )
}