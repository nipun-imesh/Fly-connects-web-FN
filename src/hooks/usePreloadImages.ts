import { useEffect, useMemo, useState } from "react"

type UsePreloadImagesResult = {
  isReady: boolean
}

const normalizeUrl = (url: unknown): string | null => {
  if (typeof url !== "string") return null
  const trimmed = url.trim()
  if (!trimmed) return null
  return trimmed
}

export default function usePreloadImages(imageUrls: unknown[]): UsePreloadImagesResult {
  const urls = useMemo(() => {
    return imageUrls.map(normalizeUrl).filter((u): u is string => Boolean(u))
  }, [imageUrls])

  const urlsKey = useMemo(() => urls.join("|"), [urls])
  const [isReady, setIsReady] = useState<boolean>(urls.length === 0)

  useEffect(() => {
    if (urls.length === 0) {
      setIsReady(true)
      return
    }

    let isCancelled = false
    setIsReady(false)

    let finishedCount = 0

    const handleOneFinished = (): void => {
      finishedCount += 1
      if (!isCancelled && finishedCount >= urls.length) {
        setIsReady(true)
      }
    }

    const images = urls.map((url) => {
      const img = new Image()
      img.onload = handleOneFinished
      img.onerror = handleOneFinished
      img.src = url
      return img
    })

    return () => {
      isCancelled = true
      for (const img of images) {
        img.onload = null
        img.onerror = null
      }
    }
  }, [urlsKey, urls.length])

  return { isReady }
}
