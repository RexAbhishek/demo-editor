import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaEraser } from "react-icons/fa";

type FormatCommand = "bold" | "italic" | "underline" | "strikeThrough";

const FormatButtons = ({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) => {
  const formatText = (command: FormatCommand) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
  
    // Use `document.execCommand` to toggle formatting
    switch (command) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "strikeThrough":
        document.execCommand("strikeThrough");
        break;
    }
  
    // Refocus on the editor
    editorRef.current.focus();
  };

  const clearFormatting = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
  
    document.execCommand("removeFormat");
  
    // Refocus on the editor
    editorRef.current.focus();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => formatText("bold")}
        title="Bold"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaBold className="text-gray-700" />
      </button>
      <button
        onClick={() => formatText("italic")}
        title="Italic"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaItalic className="text-gray-700" />
      </button>
      <button
        onClick={() => formatText("underline")}
        title="Underline"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaUnderline className="text-gray-700" />
      </button>
      <button
        onClick={() => formatText("strikeThrough")}
        title="Strikethrough"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaStrikethrough className="text-gray-700" />
      </button>
      <button
        onClick={clearFormatting}
        title="Clear Formatting"
        className="p-2 hover:bg-gray-200 rounded transition-colors"
      >
        <FaEraser className="text-gray-700" />
      </button>
    </div>
  );
};

export default FormatButtons;