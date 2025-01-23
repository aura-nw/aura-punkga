import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom'
import Image from 'next/image'
import { ComponentProps, RefCallback, useRef } from 'react'

type ImageZoomProps = ComponentProps<'img'> & {
  options?: ZoomOptions
}

export function ImageZoom({ options, ...props }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null)

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({ margin: 0, background: '#191919' })
    }

    return zoomRef.current
  }

  const attachZoom: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom()

    if (node) {
      zoom.attach(node)
    } else {
      zoom.detach()
    }
  }

  return <Image {...(props as any)} ref={attachZoom} />
}
