import { RevisionRequest, WorkflowStep, GenerateWorkflowRequest, Workflow, GenerateWorkflowStepRequest } from './types';
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

  generateWorkflowStep: (data: GenerateWorkflowStepRequest): Promise<WorkflowStep> => {
    return apiClient.post<WorkflowStep>('/workflow/step/generate', data);
  },
}; 