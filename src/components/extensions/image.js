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

  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    return [
      'figure',
      { style },
      ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    ];
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.height) return {};
          return { height: attributes.height };
        },
      },
    }
  },
}); 