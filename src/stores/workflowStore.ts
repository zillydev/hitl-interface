import { create } from 'zustand';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  toolName: string;
  aiReasoning: string;
}

interface WorkflowStore {
  steps: WorkflowStep[];
  setSteps: (steps: WorkflowStep[]) => void;
  reorderSteps: (sourceIndex: number, destinationIndex: number) => void;
  deleteStep: (stepId: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  steps: [
    {
      id: '1',
      title: "Create Lead in Salesforce",
      description: "Automatically create a new lead when a form is submitted",
      toolName: "Salesforce",
      aiReasoning: "This step ensures new leads are properly tracked in your CRM system"
    },
    {
      id: '2',
      title: "Send Welcome Email",
      description: "Send a personalized welcome email to new leads",
      toolName: "HubSpot",
      aiReasoning: "First touchpoint with the lead to establish communication"
    },
    {
      id: '3',
      title: "Schedule Follow-up Call",
      description: "Automatically schedule a sales call with qualified leads",
      toolName: "Calendly",
      aiReasoning: "Proactive engagement to move leads through the sales funnel"
    },
    {
      id: '4',
      title: "Share Product Demo",
      description: "Send personalized product demo video based on lead interests",
      toolName: "Vidyard",
      aiReasoning: "Educational content to showcase product value proposition"
    },
    {
      id: '5',
      title: "Add to Nurture Campaign",
      description: "Enroll lead in automated nurture campaign sequence",
      toolName: "HubSpot",
      aiReasoning: "Maintain engagement with regular, valuable content"
    },
    {
      id: '6',
      title: "Update Lead Score",
      description: "Adjust lead score based on engagement activities",
      toolName: "Salesforce",
      aiReasoning: "Track lead progression and prioritize sales efforts"
    },
    {
      id: '7',
      title: "Create Task for Sales Team",
      description: "Generate task for sales rep to follow up with hot leads",
      toolName: "Asana",
      aiReasoning: "Ensure timely follow-up with qualified opportunities"
    }
  ],
  setSteps: (steps) => set({ steps }),
  reorderSteps: (sourceIndex, destinationIndex) =>
    set((state) => {
      const newSteps = Array.from(state.steps);
      const [removed] = newSteps.splice(sourceIndex, 1);
      newSteps.splice(destinationIndex, 0, removed);
      return { steps: newSteps };
    }),
  deleteStep: (stepId) =>
    set((state) => ({
      steps: state.steps.filter((step) => step.id !== stepId),
    })),
})); 