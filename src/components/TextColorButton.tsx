import { useState } from "react";
import { FaPalette } from "react-icons/fa";

const TextColorButton: React.FC<{ editorRef: React.RefObject<HTMLDivElement | null>, className?: string }> = ({ editorRef }) => {
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef?.current) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = selectedColor;

      try {
        range.surroundContents(span);
      } catch (error) {
        console.error("Error applying text color:", error);
      }
    }

    setShowColorPicker(false);

    // Refocus on editor
    editorRef?.current?.focus();
  };

  return (
    <div className="color-button">
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        title="Text Color"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaPalette style={{ color: color }} />
      </button>
      {showColorPicker && (
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          style={{ marginTop: "5px" }}
        />
      )}
    </div>
  );
};

export default TextColorButton;