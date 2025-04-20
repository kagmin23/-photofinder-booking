import { useMemo } from "react"

export const useGetUser = () => {
  return useMemo(() => {
    return  {
      token: localStorage.getItem('authToken'),
    }
  }, [])
}