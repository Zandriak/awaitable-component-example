import { useCallback, useState } from "react"

type AwaitableComponentStatus = 'idle' | 'awaiting' | 'resolved' | 'rejected'
type AwaitableComponentData<TResolve> = {
  status: AwaitableComponentStatus,
  resolve: ((value: TResolve) => void) | null,
  reject: ((reason: any) => void) | null,
}

export default function useAwaitableComponent<TResolve>() {
  const [data, setData] = useState<AwaitableComponentData<TResolve>>({ status: 'idle', resolve: null, reject: null })

  const handleResolve = useCallback((value: TResolve) => {
    if (data.status !== 'awaiting') {
        throw new Error("Awaitable component is not awaiting.")
    }

    data.resolve?.(value)
    setData({ ...data, status: 'resolved'})
  }, [data])

  const handleReject = useCallback((error: any) => {
    if (data.status !== 'awaiting') {
        throw new Error("Awaitable component is not awaiting.")
    }

    data.reject?.(error)
    setData({ ...data, status: 'rejected'})
  }, [data])

  const handleExecute = async () => {
    return new Promise<TResolve>((resolve, reject) => {
      setData({ status: 'awaiting', resolve, reject })
    })
  }

  return [data.status, handleExecute, handleResolve, handleReject] as const
}