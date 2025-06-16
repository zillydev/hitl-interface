import { RevisionRequest, WorkflowStep, GenerateWorkflowRequest, Workflow } from './types';
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
}; 