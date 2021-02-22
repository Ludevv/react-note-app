import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
  initialState: { notes: [] },
  actions: {
    addNotes: (newNote) => ({ setState, getState }) => {
      setState({ notes: newNote});
    },
  },
});

export const useNotes = createHook(Store);