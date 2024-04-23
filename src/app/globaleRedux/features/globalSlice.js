import { createSlice } from '@reduxjs/toolkit';
import { v4 as generateID } from 'uuid';

const generateEditorElement = (type) => {
  const commonFields = {
    id: generateID(),
    type,
    placeHolder: 'Placeholder Label',
    label: type,
    prefix: '',
    suffix: '',
  };

  switch (type) {
    case 'text-input':
    case 'text-area':
    case 'email':
    case 'date':
    case 'phone':
      return commonFields;
    case 'password':
      return {
        ...commonFields,
      };
    default:
      return null;
  }
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    editorElements: [],
  },
  reducers: {
    insertEditorElement: (state, action) => {
      const { type } = action.payload;
      state.editorElements.push(generateEditorElement(type));
    },

    insertAtEditorElement: (state, action) => {
      const { index, type } = action.payload;
      state.editorElements.splice(index, 0, generateEditorElement(type));
    },

    moveEditorElement: (state, action) => {
      const { from, to } = action.payload;
      const editorElements = [...state.editorElements];
      const element = editorElements[from];
      editorElements.splice(from, 1);
      editorElements.splice(to, 0, element);
      state.editorElements = editorElements;
    },

    removeEditorElement: (state, action) => {
      const { id } = action.payload;
      state.editorElements = state.editorElements.filter(
        (element) => element.id !== id
      );
    },

    updateEditorElement: (state, action) => {
      const { id, element } = action.payload;
      const editorElements = [...state.editorElements];
      const index = editorElements.findIndex((element) => element.id === id);
      editorElements[index] = element;
      state.editorElements = editorElements;
    },

    clearCanvas: (state) => {
      state.editorElements = [];
    },

    cloneEditorElement: (state, action) => {
      const { id } = action.payload;
      const elementToCloneIndex = state.editorElements.findIndex(
        (element) => element.id === id
      );
      if (elementToCloneIndex !== -1) {
        const elementToClone = state.editorElements[elementToCloneIndex];
        const clonedElement = { ...elementToClone, id: generateID() };
        state.editorElements.splice(elementToCloneIndex + 1, 0, clonedElement);
      }
    },
  },
});

export const {
  clearCanvas,
  insertEditorElement,
  moveEditorElement,
  insertAtEditorElement,
  removeEditorElement,
  updateEditorElement,
  cloneEditorElement,
} = globalSlice.actions;

export default globalSlice.reducer;
