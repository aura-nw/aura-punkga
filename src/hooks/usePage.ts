import { useRouter } from 'next/router'
import { useState } from 'react'

export default function usePage() {
  const { replace } = useRouter()
  const searchParams = new URLSearchParams(location.search)
  const [page, setPage] = useState(+searchParams.get('page') || 1)
  const updatePage = (newPage) => {
    setPage(+newPage)
    searchParams.set('page', newPage)
    replace(`${location.pathname}?${searchParams}`)
  }
  return [page, updatePage] as [number, (value: number) => void]
}
