"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserQRCodeReader } from "@zxing/browser";
import jsQR from "jsqr";

export default function QRScanner() {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const [activeTab, setActiveTab] = useState("camera");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const router = useRouter();

  // ── CAMERA ──────────────────────────────────────────
  useEffect(() => {
    if (activeTab === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab]);

  const stopCamera = () => {
    if (codeReaderRef.current) {
      try {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
      } catch (e) {
        console.log("Camera stop error:", e);
      }
      codeReaderRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;
      setCameraActive(true);
      setError(null);

      const videoInputDevices =
        await BrowserQRCodeReader.listVideoInputDevices();
      const selectedDeviceId = videoInputDevices[0]?.deviceId;

      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            const assetId = result.getText().split("/").pop();
            stopCamera();
            router.push(`/asset-result/${assetId}`);
          }
          if (err && err?.name !== "NotFoundException") {
            setError("❌ Camera error. Try uploading an image instead.");
          }
        }
      );
    } catch (e) {
      setError("❌ Could not access camera. Try uploading an image instead.");
      setCameraActive(false);
    }
  };

  // ── IMAGE UPLOAD ─────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0, 0, canvas.width, canvas.height
      );
      const code = jsQR(
        imageData.data,
        imageData.width,
        imageData.height
      );

      if (code) {
        const assetId = code.data.split("/").pop();
        router.push(`/asset-result/${assetId}`);
      } else {
        setError("❌ No QR code found. Try a clearer image.");
        setLoading(false);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  // ── RENDER ───────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto mt-10 p-5 font-sans">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#1E3A5F]">
          🔲 Scan Asset QR Code
        </h2>
        <p className="text-gray-500">
          Use camera or upload a QR code image
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#1E3A5F] mb-6">
        <button
          onClick={() => {
            setActiveTab("camera");
            setError(null);
            setPreview(null);
          }}
          className={`flex-1 py-3 font-bold text-sm ${
            activeTab === "camera"
              ? "bg-[#1E3A5F] text-white"
              : "bg-blue-50 text-[#1E3A5F]"
          }`}
        >
          📷 Live Camera
        </button>
        <button
          onClick={() => {
            setActiveTab("upload");
            setError(null);
          }}
          className={`flex-1 py-3 font-bold text-sm ${
            activeTab === "upload"
              ? "bg-[#1E3A5F] text-white"
              : "bg-blue-50 text-[#1E3A5F]"
          }`}
        >
          📁 Upload Image
        </button>
      </div>

      {/* Camera Tab */}
      {activeTab === "camera" && (
        <div className="text-center">
          <video
            ref={videoRef}
            className="w-full rounded-xl border-2 border-[#1E3A5F]"
          />
          <p className="text-gray-400 mt-2 text-sm">
            Point camera at the QR code on the asset
          </p>
          {cameraActive && (
            <button
              onClick={stopCamera}
              className="mt-4 w-full py-3 bg-[#1E3A5F] text-white rounded-lg"
            >
              ⏹ Stop Camera
            </button>
          )}
          {error && (
            <p className="text-red-500 mt-3">{error}</p>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <div className="text-center">
          <label className="block border-2 border-dashed border-[#1E3A5F] rounded-xl p-10 cursor-pointer bg-blue-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {preview ? (
              <img
                src={preview}
                alt="QR Preview"
                className="w-full rounded-lg"
              />
            ) : (
              <>
                <p className="text-5xl">📁</p>
                <p className="font-bold mt-2">
                  Click to upload QR code image
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Supports JPG, PNG, WEBP
                </p>
              </>
            )}
          </label>

          {loading && (
            <p className="text-[#1E3A5F] mt-4">
              🔍 Reading QR code...
            </p>
          )}

          {preview && (
            <button
              onClick={() => {
                setPreview(null);
                setError(null);
              }}
              className="mt-4 w-full py-3 bg-[#1E3A5F] text-white rounded-lg"
            >
              🔄 Upload Different Image
            </button>
          )}

          {error && (
            <p className="text-red-500 mt-3">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}