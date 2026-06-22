import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

interface BarcodeImageProps {
  text: string
}

export default function BarcodeImage({ text }: BarcodeImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      try {
        const containerWidth = containerRef.current.clientWidth
        JsBarcode(canvasRef.current, text, {
          format: 'CODE128',
          width: Math.max(0.5, containerWidth / 600),
          height: 28,
          displayValue: false,
          margin: 0,
          background: 'transparent',
          lineColor: '#ffffff',
        })
      } catch {
        // silent fallback
      }
    }
  }, [text])

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ maxHeight: '28px' }}
      />
    </div>
  )
}
