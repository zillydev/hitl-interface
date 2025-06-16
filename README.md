# HITL Interface

A Human-in-the-Loop interface for workflow generation and management, built with React, TypeScript, and Tailwind CSS.

## Features

- 🤖 AI-powered workflow generation through chat
- 🎯 Interactive workflow editing with drag-and-drop
- 🌓 Dark mode support
- ⌨️ Keyboard shortcuts

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Assumptions

1. **AI Integration**: The application assumes integration with an AI service for workflow generation and clarification. Currently using mock APIs.

2. **Tool Integration**: The system assumes integration with various tools like Salesforce, HubSpot, Calendly, Vidyard, and Asana for workflow execution.

3. **User Interaction**: The interface assumes a conversational approach where users can:
   - Input natural language prompts
   - Clarify requirements through chat
   - Review and edit generated workflows
   - Approve or reject workflows

## Edge Cases Handled

1. **Workflow Generation**:
   - Failed generation attempts with retry
   - Loading states during AI processing
   - Error feedback

2. **User Input**:
   - Empty submission prevention
   - Retry handling
   - Conversation state management

3. **Workflow Editing**:
   - Drag-and-drop reordering
   - Undo/redo operations

4. **Navigation**:
   - Workflow state preservation
   - URL encoding/decoding
   - Page transitions

## Future Improvements

1. **AI Integration**:
   - Real AI service integration
   - Better conversation handling
   - Improved generation accuracy

2. **Workflow Execution**:
   - Actual execution logic
   - Progress tracking
   - Error handling

3. **User Experience**:
   - Workflow history
   - Scroll to updated step after undo/redo