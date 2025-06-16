import { RevisionRequest, WorkflowStep, GenerateWorkflowRequest, Workflow, GenerateWorkflowStepRequest } from './types';

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "wf-001",
    name: "Customer Onboarding Process",
    description: "Automated workflow for new customer onboarding and initial setup",
    steps: [
      {
        id: "step-001",
        title: "Collect Customer Information",
        description: "Gather basic customer details including company name, contact information, and business requirements",
        toolName: "Salesforce",
        aiReasoning: "Initial data collection is crucial for personalizing the onboarding experience",
        agentName: "Claude",
        confidenceScore: 0.95
      },
      {
        id: "step-002",
        title: "Create Customer Account",
        description: "Set up customer account in CRM with collected information and assign account manager",
        toolName: "Salesforce",
        aiReasoning: "Account creation should follow immediately after data collection to maintain momentum",
        agentName: "Claude",
        confidenceScore: 0.92
      },
      {
        id: "step-003",
        title: "Send Welcome Email",
        description: "Send personalized welcome email with next steps and important contacts",
        toolName: "HubSpot",
        aiReasoning: "Welcome communication helps establish relationship and sets expectations",
        agentName: "Claude",
        confidenceScore: 0.90
      }
    ],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "wf-002",
    name: "Lead Qualification Process",
    description: "Systematic approach to qualify and nurture potential leads",
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
        confidenceScore: 0.40
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
    createdAt: "2024-03-15T11:00:00Z",
    updatedAt: "2024-03-15T11:00:00Z"
  }
];

export const mockRevisionApi = {
  requestRevision: async (data: RevisionRequest): Promise<WorkflowStep> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    // const success = Math.random() > 0.1; // 90% success rate
    const success = true;

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

export const mockWorkflowApi = {
  generateWorkflow: async (data: GenerateWorkflowRequest): Promise<Workflow> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (!success) {
      throw {
        message: 'Failed to generate workflow',
        code: 'WORKFLOW_GENERATION_FAILED',
        status: 500,
      };
    }

    // Select a workflow based on the prompt similarity
    const workflow = MOCK_WORKFLOWS[Math.floor(Math.random() * MOCK_WORKFLOWS.length)];

    // Create a new instance with a new ID to simulate generation
    return {
      ...workflow,
      id: `wf-${Date.now()}`,
      name: data.name || workflow.name,
      description: data.description || workflow.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  generateWorkflowStep: async (data: GenerateWorkflowStepRequest): Promise<WorkflowStep> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (!success) {
      throw {
        message: 'Failed to generate workflow step',
        code: 'GENERATION_FAILED',
        status: 500,
      };
    }

    // Generate a mock workflow step based on the prompt
    return {
      id: `step-${Date.now()}`,
      title: `Generated step from: ${data.prompt.substring(0, 30)}...`,
      description: `This is a generated step based on the prompt: ${data.prompt}`,
      toolName: data.context?.toolPreferences?.[0] || "Default Tool",
      aiReasoning: "Generated based on the provided prompt and context",
      agentName: "Claude",
      confidenceScore: 0.85
    };
  },
}; 