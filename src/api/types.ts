export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface RevisionRequest {
  stepId: string;
  steps: WorkflowStep[];
  revisionPrompt: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  toolName: string;
  aiReasoning: string;
  agentName: string;
  confidenceScore: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerateWorkflowRequest {
  name: string;
  description: string;
  prompt: string;
  context?: {
    toolPreferences?: string[];
    maxSteps?: number;
    existingWorkflows?: Workflow[];
  };
}

export interface ClarificationResponse {
  message: string;
  isComplete: boolean;
  nextQuestion?: string;
}
