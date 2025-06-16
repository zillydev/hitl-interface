import { RevisionRequest, WorkflowStep } from './types';
import { apiClient } from './client';

export const revisionApi = {
  requestRevision: (data: RevisionRequest): Promise<WorkflowStep> => {
    return apiClient.post<WorkflowStep>('/revisions/request', data);
  },
}; 