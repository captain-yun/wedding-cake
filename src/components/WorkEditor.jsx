import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

export default function WorkEditor({ initialContent, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          Bold
        </button>
        {/* 더 많은 툴바 버튼들 추가 */}
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
} 