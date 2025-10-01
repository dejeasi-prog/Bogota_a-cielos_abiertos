import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

// FIX: Removed incorrect global `jsQR` declaration.
// The component correctly imports `jsQR` as an ES module, making this declaration unnecessary and confusing.

interface QRScannerProps {
  onSuccess: (data: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onSuccess, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.setAttribute('playsinline', 'true'); // Required for iOS
          videoRef.current.play();
          tick();
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setError("No se pudo acceder a la cámara. Por favor, revisa los permisos en tu navegador.");
      }
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          // You might want to add a vibration or sound effect here
          onSuccess(code.data);
          return; // Stop scanning
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="text-white text-4xl leading-none">&times;</button>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center font-serif text-white">Apunta al código QR del lugar</h2>
      <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden border-4 border-amber-500 shadow-2xl">
        <video ref={videoRef} className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute inset-0 border-8 border-white/20" />
      </div>
      {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
       {!error && <p className="mt-4 text-gray-200 text-center">Buscando código...</p>}
    </div>
  );
};

// FIX: Removed unnecessary and incorrect polyfill for `window.jsQR`.
// This was causing a TypeScript error and is not needed since `jsQR` is imported as a module.

export default QRScanner;