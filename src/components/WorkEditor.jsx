import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { Extension } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/core';
import { useCallback, useState, useEffect } from 'react';
import '../styles/editor.css';
import { CustomImage } from './extensions/image';

// FontSize 확장
const FontSize = Extension.create({
    name: 'fontSize',
    
    addCommands() {
      return {
        setFontSize: (fontSize) => ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize })
            .run();
        },
      };
    },
  
    addGlobalAttributes() {
      return [
        {
          types: ['textStyle'],
          attributes: {
            fontSize: {
              default: null,
              parseHTML: element => element.style.fontSize,
              renderHTML: attributes => {
                if (!attributes.fontSize) return {};
                return { style: `font-size: ${attributes.fontSize}` };
              },
            },
          },
        },
      ];
    },
  });

// LineHeight 확장
const LineHeight = Extension.create({
    name: 'lineHeight',
    
    addCommands() {
      return {
        setLineHeight: (lineHeight) => ({ commands }) => {
          return commands.updateAttributes('paragraph', { lineHeight });
        },
      };
    },
  
    addAttributes() {
      return {
        lineHeight: {
          default: '1.0',
          parseHTML: element => element.style.lineHeight,
          renderHTML: attributes => {
            if (!attributes.lineHeight) return {};
            return { style: `line-height: ${attributes.lineHeight}` };
          },
        },
      };
    },
  });

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
      <select 
        onChange={e => editor.chain().focus().toggleHeading({ level: Number(e.target.value) }).run()}
        className="border rounded px-2 py-1"
      >
        <option value="">제목</option>
        <option value="1">제목 1</option>
        <option value="2">제목 2</option>
        <option value="3">제목 3</option>
      </select>

      <select 
        onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        className="border rounded px-2 py-1"
      >
        <option value="">크기</option>
        {[12, 14, 16, 18, 20, 24, 28, 32].map(size => (
          <option key={size} value={`${size}px`}>{size}px</option>
        ))}
      </select>

      <select 
        onChange={e => editor.chain().focus().setLineHeight(e.target.value).run()}
        className="border rounded px-2 py-1"
      >
        <option value="">줄간격</option>
        <option value="1.0">1.0</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0</option>
      </select>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        <i className="fas fa-bold"></i>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        <i className="fas fa-italic"></i>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
      >
        <i className="fas fa-underline"></i>
      </button>

      <input
  type="color"
  onInput={e => editor.chain().focus().setColor(e.target.value).run()}
  className="w-8 h-8 p-1 border rounded"
  title="Text color"
/>

      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.length) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                editor.chain().focus().setImage({
                  src: img.src,
                }).run();
              };
              img.src = e.target?.result;
            };
            reader.readAsDataURL(file);
          }
        }}
      />

<button
  onClick={() => editor.chain().focus().setTextAlign('left').run()}
  className={`p-2 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
>
  <i className="fas fa-align-left"></i>
</button>
<button
  onClick={() => editor.chain().focus().setTextAlign('center').run()}
  className={`p-2 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
>
  <i className="fas fa-align-center"></i>
</button>
<button
  onClick={() => editor.chain().focus().setTextAlign('right').run()}
  className={`p-2 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
>
  <i className="fas fa-align-right"></i>
</button>  

      <button
        onClick={() => document.getElementById('image-upload')?.click()}
        className="p-2"
      >
        <i className="fas fa-image"></i>
      </button>
    </div>
  );
};

export default function WorkEditor({ initialContent = '', onChange, onThumbnailChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        image: false,
      }),
      Color.configure({ types: ['textStyle'] }),
      TextStyle,
      FontSize,
      LineHeight,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        defaultAlignment: 'left',
        alignments: ['left', 'center', 'right'],
      }),
      Underline,
      CustomImage.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
        resizable: true,
        allowBase64: true,
        draggable: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ editor }) => editor.isActive('image')}
        >
          <div className="flex items-center space-x-2 bg-white shadow-lg rounded-lg p-2 border">
            <button 
              onClick={() => {
                editor.chain().focus().updateAttributes('image', {
                  textAlign: 'left'
                }).run();
              }}
              className={`p-2 ${editor.isActive('image', { textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            >
              <i className="fas fa-align-left"></i>
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().updateAttributes('image', {
                  textAlign: 'center'
                }).run();
              }}
              className={`p-2 ${editor.isActive('image', { textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            >
              <i className="fas fa-align-center"></i>
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().updateAttributes('image', {
                  textAlign: 'right'
                }).run();
              }}
              className={`p-2 ${editor.isActive('image', { textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            >
              <i className="fas fa-align-right"></i>
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
} 