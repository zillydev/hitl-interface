export interface RevisionRequest {
  stepId: string;
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

export interface GenerateWorkflowStepRequest {
  prompt: string;
  context?: {
    previousSteps?: WorkflowStep[];
    toolPreferences?: string[];
  };
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