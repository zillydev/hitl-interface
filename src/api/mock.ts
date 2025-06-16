import { RevisionRequest, WorkflowStep, GenerateWorkflowRequest, Workflow } from './types';

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
        confidenceScore: 0.37
      },
      {
        id: "step-003",
        title: "Send Welcome Email",
        description: "Send personalized welcome email with next steps and important contacts",
        toolName: "HubSpot",
        aiReasoning: "Welcome communication helps establish relationship and sets expectations",
        agentName: "Claude",
        confidenceScore: 0.90
      },
      {
        id: "step-004",
        title: "Schedule Onboarding Call",
        description: "Set up initial onboarding call with customer success team",
        toolName: "Calendly",
        aiReasoning: "Direct communication helps address immediate questions and concerns",
        agentName: "Claude",
        confidenceScore: 0.88
      },
      {
        id: "step-005",
        title: "Create Project Timeline",
        description: "Generate project timeline and milestones in project management tool",
        toolName: "Asana",
        aiReasoning: "Clear timeline helps set expectations and track progress",
        agentName: "Claude",
        confidenceScore: 0.85
      },
      {
        id: "step-006",
        title: "Share Resource Library",
        description: "Send access to knowledge base and training materials",
        toolName: "HubSpot",
        aiReasoning: "Self-service resources empower customers to get started independently",
        agentName: "Claude",
        confidenceScore: 0.87
      },
      {
        id: "step-007",
        title: "Set Up Integration Connections",
        description: "Configure and test required system integrations",
        toolName: "Salesforce",
        aiReasoning: "System integration is crucial for seamless workflow automation",
        agentName: "Claude",
        confidenceScore: 0.82
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

interface ClarificationResponse {
  message: string;
  isComplete: boolean;
  nextQuestion?: string;
}

const CLARIFICATION_QUESTIONS = [
  {
    initial: "I'll help you create a workflow. Let me ask a few questions to better understand your needs:\n\n1. What is the main goal of this workflow?\n2. Who are the main users of this workflow?\n3. Are there any specific tools or integrations you'd like to include?",
    followUps: [
      "Great! Now, what are the key steps or actions that need to happen in this workflow?",
      "Finally, are there any specific conditions or triggers that should start this workflow?"
    ]
  }
];

export const mockClarificationApi = {
  getClarificationResponse: async (_userInput: string, messageCount: number): Promise<ClarificationResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = Math.random() > 0.5; // 50% success rate

    if (!success) {
      throw {
        message: 'Failed to process clarification',
        code: 'CLARIFICATION_FAILED',
        status: 500,
      };
    }

    // If this is the first message, return the initial questions
    if (messageCount === 1) {
      return {
        message: CLARIFICATION_QUESTIONS[0].initial,
        isComplete: false
      };
    }

    // If we've received all answers, mark as complete
    if (messageCount >= 5) {
      return {
        message: "Thank you for providing all the information. I'll now generate your workflow.",
        isComplete: true
      };
    }

    // Return follow-up questions
    const questionIndex = Math.floor((messageCount - 1) / 2);
    return {
      message: CLARIFICATION_QUESTIONS[0].followUps[questionIndex],
      isComplete: false
    };
  }
};

export const mockRevisionApi = {
  requestRevision: async (data: RevisionRequest): Promise<WorkflowStep> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = Math.random() > 0.5;

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
  generateWorkflow: async (_data: GenerateWorkflowRequest): Promise<Workflow> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = Math.random() > 0.5;

    if (!success) {
      throw {
        message: 'Failed to generate workflow',
        code: 'WORKFLOW_GENERATION_FAILED',
        status: 500,
      };
    }

    return MOCK_WORKFLOWS[Math.floor(Math.random() * MOCK_WORKFLOWS.length)];
  },
}; 