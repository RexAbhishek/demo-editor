import TextColorButton from "@/components/TextColorButton";
import HighlightColorButton from "@/components/HighlightColorButton";

type ColorButtonsProps = {
  editorRef: React.RefObject<HTMLDivElement | null>;
};

const ColorButtons: React.FC<ColorButtonsProps> = ({ editorRef }) => {
  return (
    <div className="flex items-center gap-1 p-1 border rounded-lg bg-gray-50">
      <TextColorButton 
      editorRef={editorRef}
      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground" 
      />
      <HighlightColorButton editorRef={editorRef} 
      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
      />
    </div>
  );
};

export default ColorButtons;