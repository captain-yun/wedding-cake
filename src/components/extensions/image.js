import { Image } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export const CustomImage = Image.extend({
  name: 'image',
  
  addOptions() {
    return {
      ...this.parent?.(),
      inline: false,
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '50%',
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
      height: {
        default: 'auto',
        renderHTML: attributes => {
          if (!attributes.height) return {};
          return { style: `height: ${attributes.height}` };
        },
      },
      textAlign: {
        default: 'left',
        parseHTML: element => element.parentElement?.getAttribute('data-align'),
        renderHTML: attributes => ({
          'data-align': attributes.textAlign,
        }),
      }
    }
  },

  addNodeView() {
    return ({ node, getPos, editor, selected }) => {
      const container = document.createElement('div');
      container.className = `image-container${selected ? ' ProseMirror-selectednode' : ''}`;
      container.contentEditable = 'false';
      container.draggable = true;
      
      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.className = 'editor-image';
      img.style.width = node.attrs.width || '50%';
      img.style.height = node.attrs.height || 'auto';
      
      container.setAttribute('data-align', node.attrs.textAlign || 'left');
      container.appendChild(img);

      const handles = ['nw', 'ne', 'sw', 'se'];
      handles.forEach(pos => {
        const handle = document.createElement('div');
        handle.className = `resize-handle-${pos} resize-handle`;
        container.appendChild(handle);
      });

      let startX, startWidth;

      const handleMouseDown = (e, handle) => {
        e.preventDefault();
        startX = e.clientX;
        startWidth = img.offsetWidth;
        
        const handleMouseMove = (e) => {
          const dx = e.clientX - startX;
          let newWidth = startWidth;

          if (handle.includes('e')) newWidth += dx;
          if (handle.includes('w')) newWidth -= dx;
          
          const percentWidth = (newWidth / container.offsetWidth) * 100;
          img.style.width = `${percentWidth}%`;
          
          if (editor && typeof getPos === 'function') {
            editor.commands.updateAttributes('image', {
              width: `${percentWidth}%`
            });
          }
        };

        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      handles.forEach(pos => {
        const handle = container.querySelector(`.resize-handle-${pos}`);
        handle.addEventListener('mousedown', (e) => handleMouseDown(e, pos));
      });

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') return false;
          img.src = updatedNode.attrs.src;
          container.setAttribute('data-align', updatedNode.attrs.textAlign || 'left');
          container.className = `image-container${selected ? ' ProseMirror-selectednode' : ''}`;
          return true;
        },
      };
    };
  },
}); 

