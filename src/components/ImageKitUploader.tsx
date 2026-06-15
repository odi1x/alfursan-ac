"use client";

import { IKContext, IKUpload } from "imagekitio-react";
import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageKitUploader({ onUploadSuccess, folder }: { onUploadSuccess: (url: string) => void, folder: string }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const ikUploadRef = useRef<HTMLInputElement>(null);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: unknown) {
      throw new Error(`Authentication request failed: ${(error as Error).message}`);
    }
  };

  const onError = (err: unknown) => {
    console.error("Error uploading image:", err);
    setUploading(false);
    alert("حدث خطأ أثناء رفع الصورة.");
  };

  const onSuccess = (res: { url: string }) => {
    setUploading(false);
    setPreview(res.url);
    onUploadSuccess(res.url);
  };

  return (
    <IKContext
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <div className="flex flex-col gap-3">
        {preview && (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-line">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => ikUploadRef.current?.click()}
            className="bg-surface-2 border border-line text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? "جاري الرفع..." : preview ? "تغيير الصورة" : "اختر صورة"}
          </button>

          <div className="hidden">
            <IKUpload
              ref={ikUploadRef}
              onError={onError}
              onSuccess={onSuccess}
              onUploadStart={() => setUploading(true)}
              folder={folder}
            />
          </div>
        </div>
      </div>
    </IKContext>
  );
}
