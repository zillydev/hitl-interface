import { create } from 'zustand';
import { WorkflowStep } from '../api/types';

interface WorkflowStore {
  steps: WorkflowStep[];
  history: WorkflowStep[][];
  currentHistoryIndex: number;
  addToHistory: (newSteps: WorkflowStep[]) => void;
  reorderSteps: (sourceIndex: number, destinationIndex: number) => void;
  deleteStep: (stepId: string) => void;
  updateStep: (stepId: string, updates: Partial<WorkflowStep>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  reset: () => void;
}

const addToHistory = (state: WorkflowStore, newSteps: WorkflowStep[]) => {
  const newHistory = state.history.slice(0, state.currentHistoryIndex + 1);
  newHistory.push(newSteps);
  return {
    steps: newSteps,
    history: newHistory,
    currentHistoryIndex: newHistory.length - 1,
  };
};

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  steps: [],
  history: [],
  currentHistoryIndex: 0,
  addToHistory: (newSteps) =>
    set((state) => {
      return addToHistory(state, newSteps);
    }),
  reorderSteps: (sourceIndex, destinationIndex) =>
    set((state) => {
      if (sourceIndex === destinationIndex) {
        return state;
      }
      const newSteps = Array.from(state.steps);
      const [removed] = newSteps.splice(sourceIndex, 1);
      newSteps.splice(destinationIndex, 0, removed);
      return addToHistory(state, newSteps);
    }),
  deleteStep: (stepId) =>
    set((state) => {
      const newSteps = state.steps.filter((step) => step.id !== stepId);
      return addToHistory(state, newSteps);
    }),
  updateStep: (stepId, updates) =>
    set((state) => {
      const newSteps = state.steps.map((step) => {
        if (step.id === stepId) {
          return { ...step, ...updates };
        }
        return step;
      });
      return addToHistory(state, newSteps);
    }),
  undo: () =>
    set((state) => {
      if (state.currentHistoryIndex > 0) {
        return {
          steps: state.history[state.currentHistoryIndex - 1],
          currentHistoryIndex: state.currentHistoryIndex - 1,
        };
      }
      return state;
    }),
  redo: () =>
    set((state) => {
      if (state.currentHistoryIndex < state.history.length - 1) {
        return {
          steps: state.history[state.currentHistoryIndex + 1],
          currentHistoryIndex: state.currentHistoryIndex + 1,
        };
      }
      return state;
    }),
  canUndo: () => get().currentHistoryIndex > 0,
  canRedo: () => get().currentHistoryIndex < get().history.length - 1,
  reset: () => set({
    steps: [],
    history: [],
    currentHistoryIndex: 0,
  }),
}));