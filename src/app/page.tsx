"use client";
import { useState, useRef, useEffect } from "react";
import FormatButtons from "@/components/FormatButtons";
import ColorButtons from "@/components/ColorButtons"

export default function Home() {
  const [content, setContent] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const defaultFont = "Arial";
  const defaultFontSize = "16px";

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontFamily = defaultFont;
      editorRef.current.style.fontSize = defaultFontSize;
    }
  }, []);

  useEffect(() => {
    if (!showCode && editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, [showCode]);

  const handleChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="w-[1000px] mx-auto my-8 border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-gray-50">
        <h1 className="text-xl font-medium text-gray-800">Fin - Editor: v1.2</h1>
      </div>
      <div className="flex flex-wrap gap-2 p-3 border-b border-gray-300 bg-gray-50">
        <FormatButtons editorRef={editorRef} />
        <ColorButtons editorRef={editorRef}/>
      </div>
      {showCode ? (
        <textarea
          className="w-full h-[400px] p-4 border border-gray-300"
          value={content}
          readOnly
        />
      ) : (
        <div
          ref={editorRef}
          className="min-h-[400px] p-4 border-b border-gray-300 outline-none bg-white text-gray-800 overflow-y-auto"
          contentEditable
          onInput={handleChange}
        />
      )}
    </div>
  );
}