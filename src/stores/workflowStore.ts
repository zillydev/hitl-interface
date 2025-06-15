import { create } from 'zustand';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  toolName: string;
  aiReasoning: string;
  agentName: string;
  confidenceScore: number;
}

interface WorkflowStore {
  steps: WorkflowStep[];
  history: WorkflowStep[][];
  currentHistoryIndex: number;
  addToHistory: (newSteps: WorkflowStep[]) => void;
  setSteps: (steps: WorkflowStep[]) => void;
  reorderSteps: (sourceIndex: number, destinationIndex: number) => void;
  deleteStep: (stepId: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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
  steps: [
    {
      id: '1',
      title: "Create Lead in Salesforce",
      description: "Automatically create a new lead when a form is submitted",
      toolName: "Salesforce",
      aiReasoning: "This step ensures new leads are properly tracked in your CRM system",
      agentName: "Claude",
      confidenceScore: 0.95
    },
    {
      id: '2',
      title: "Send Welcome Email",
      description: "Send a personalized welcome email to new leads",
      toolName: "HubSpot",
      aiReasoning: "First touchpoint with the lead to establish communication",
      agentName: "Claude",
      confidenceScore: 0.88
    },
    {
      id: '3',
      title: "Schedule Follow-up Call",
      description: "Automatically schedule a sales call with qualified leads",
      toolName: "Calendly",
      aiReasoning: "Proactive engagement to move leads through the sales funnel",
      agentName: "Claude",
      confidenceScore: 0.92
    },
    {
      id: '4',
      title: "Share Product Demo",
      description: "Send personalized product demo video based on lead interests",
      toolName: "Vidyard",
      aiReasoning: "Educational content to showcase product value proposition",
      agentName: "Claude",
      confidenceScore: 0.85
    },
    {
      id: '5',
      title: "Add to Nurture Campaign",
      description: "Enroll lead in automated nurture campaign sequence",
      toolName: "HubSpot",
      aiReasoning: "Maintain engagement with regular, valuable content",
      agentName: "Claude",
      confidenceScore: 0.90
    },
    {
      id: '6',
      title: "Update Lead Score",
      description: "Adjust lead score based on engagement activities",
      toolName: "Salesforce",
      aiReasoning: "Track lead progression and prioritize sales efforts",
      agentName: "Claude",
      confidenceScore: 0.87
    },
    {
      id: '7',
      title: "Create Task for Sales Team",
      description: "Generate task for sales rep to follow up with hot leads",
      toolName: "Asana",
      aiReasoning: "Ensure timely follow-up with qualified opportunities",
      agentName: "Claude",
      confidenceScore: 0.93
    }
  ],
  history: [],
  currentHistoryIndex: 0,
  addToHistory: (newSteps) =>
    set((state) => {
      return addToHistory(state, newSteps);
    }),
  setSteps: (steps) => set((state) => {
    state.addToHistory(steps);
    return state;
  }),
  reorderSteps: (sourceIndex, destinationIndex) =>
    set((state) => {
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
}));