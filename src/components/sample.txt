"use client";

import { useState, useRef, useEffect } from "react";
// import html2pdf from "html2pdf.js";
// import { Document, Packer, Paragraph, TextRun } from "docx";
import FormatButtons from "@/components/FormatButtons";
// import ListButtons from "./ListButtons";
// import InsertButtons from "./InsertButtons";
// import ToggleButtons from "./ToggleButtons";
// import FontDropdown from "./FontDropdown";
// import ColorButtons from "./ColorButtons";
// import AlignmentButtons from "./AlignmentButtons";
// import InsertIframeButton from "./InsertIframeButton";
// import { exportToPDF } from "../../utils/exportToPDF";
// import { exportToWord } from "../../utils/exportToWord";
// import { saveToDatabase } from '../../utils/export/saveToDatabase';

export default function Home() {
  const [content, setContent] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Default font and font size
  const defaultFont = "Arial";
  const defaultFontSize = "16px";

  // Apply default styles when the editor is initialized
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
        {/* <InsertIframeButton editorRef={editorRef} /> */}
      </div>
      
      <div className="flex flex-wrap gap-2 p-3 border-b border-gray-300 bg-gray-50">
         <FormatButtons />
         {/*
        <ColorButtons />
        <ListButtons />
        <InsertButtons editorRef={editorRef} setContent={setContent} />
        <FontDropdown editorRef={editorRef} />
        <AlignmentButtons editorRef={editorRef} />
         */}
        <div className="flex gap-2">
          {/* <button 
            onClick={() => exportToPDF(editorRef.current)}
            className="p-1 text-sm rounded hover:bg-gray-200 transition-colors"
          >
            Export to PDF
          </button>
          <button 
            onClick={async () => {
              const result = await saveToDatabase(editorRef.current);
              if (result.success) {
                alert(result.message);
              } else {
                alert(`Error: ${result.message}`);
              }
            }}
            className="p-1 text-sm rounded hover:bg-gray-200 transition-colors"
          >
            Save to Database
          </button> */}
        </div>
        
        {/* <ToggleButtons
          setShowCode={setShowCode}
          setShowPreview={setShowPreview}
          showCode={showCode}
        /> */}
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

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-2xl hover:text-gray-600"
            >
              &times;
            </button>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      )}
    </div>
  );
}
