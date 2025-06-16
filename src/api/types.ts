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