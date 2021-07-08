import {useEffect, useState} from 'react'

export const useImageSize = (background) => {
  const [imageSize, setImageSize] = useState(null)

  useEffect(() => {
    // Calculate the image sizes
    async function calcImageSize(path) {
      const img = new Image()
      img.src = path
      await img.decode()
      const width = img.naturalWidth
      const height = img.naturalHeight
      setImageSize({width, height})
    }

    calcImageSize(background)
  }, [imageSize, background])

  return imageSize
}
