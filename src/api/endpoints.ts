import { RevisionRequest, WorkflowStep, GenerateWorkflowRequest, Workflow, Message, ClarificationResponse } from './types';
import { apiClient } from './client';

export const revisionApi = {
  requestRevision: (data: RevisionRequest): Promise<WorkflowStep> => {
    return apiClient.post<WorkflowStep>('/revisions/request', data);
  },
};

export const workflowApi = {
  generateWorkflow: (data: GenerateWorkflowRequest): Promise<Workflow> => {
    return apiClient.post<Workflow>('/workflow/generate', data);
  },
  persistWorkflow: (workflow: Workflow): Promise<Workflow> => {
    return apiClient.post<Workflow>('/workflow/persist', workflow);
  },
};

export const chatApi = {
  generateResponse: (messages: Message[]): Promise<ClarificationResponse> => {
    return apiClient.post<ClarificationResponse>('/chat/generate', { messages });
  },
};
