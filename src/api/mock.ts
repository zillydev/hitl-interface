import { RevisionRequest, WorkflowStep } from './types';

export const mockRevisionApi = {
  requestRevision: async (data: RevisionRequest): Promise<WorkflowStep> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (!success) {
      throw {
        message: 'Failed to process revision request',
        code: 'REVISION_FAILED',
        status: 500,
      };
    }

    return {
      id: data.stepId,
      title: "Revised step",
      description: "Revised description",
      toolName: "Salesforce",
      aiReasoning: "Revised AI reasoning",
      agentName: "Claude",
      confidenceScore: 0.95
    };
  },
}; 