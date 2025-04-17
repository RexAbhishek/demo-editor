import { useState } from "react";
import { FaHighlighter } from "react-icons/fa";

const HighlightColorButton: React.FC<{ editorRef: React.RefObject<HTMLDivElement | null> ,className?: string}> = ({ editorRef }) => {
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const handleHighlightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    setHighlightColor(selectedColor);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef?.current) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = selectedColor;

      try {
        range.surroundContents(span);
      } catch (error) {
        console.error("Error applying highlight color:", error);
      }
    }

    setShowHighlightPicker(false);

    // Refocus on editor
    editorRef?.current?.focus();
  };

  return (
    <div className="highlight-button">
      <button
        onClick={() => setShowHighlightPicker(!showHighlightPicker)}
        title="Highlight Color"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaHighlighter style={{ color: highlightColor }} />
      </button>
      {showHighlightPicker && (
        <input
          type="color"
          value={highlightColor}
          onChange={handleHighlightChange}
          style={{ marginTop: "5px" }}
        />
      )}
    </div>
  );
};

export default HighlightColorButton;