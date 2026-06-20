import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

interface BarcodeImageProps {
  text: string
}

export default function BarcodeImage({ text }: BarcodeImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, {
          format: 'CODE128',
          width: 1.2,
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
    <canvas
      ref={canvasRef}
      className="block w-full max-w-full"
      style={{ maxHeight: '28px' }}
    />
  )
}
