import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../widgets/DarkModeToggle';
import WorkflowStep from '../components/WorkflowStep';
import { DragDropContext, Draggable, Droppable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

const WorkflowEditor: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title || '');

  // Example workflow steps
  const [steps, setSteps] = useState([
    {
      id: '1',
      title: "Create Lead in Salesforce",
      description: "Automatically create a new lead when a form is submitted",
      toolName: "Salesforce",
      aiReasoning: "This step ensures new leads are properly tracked in your CRM system"
    },
    {
      id: '2',
      title: "Send Welcome Email",
      description: "Send a personalized welcome email to new leads",
      toolName: "HubSpot",
      aiReasoning: "First touchpoint with the lead to establish communication"
    }
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSteps(items);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Go back"
              >
                <span className="material-icons !text-xl">arrow_back</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                {decodedTitle}
              </h1>
            </div>
            <DarkModeToggle />
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[600px]">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="workflow-steps">
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {steps.map((step, index) => (
                      <Draggable
                        key={step.id}
                        draggableId={step.id}
                        index={index}
                      >
                        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? 'opacity-50' : ''}`}
                          >
                            <div className="cursor-grab active:cursor-grabbing">
                              <WorkflowStep
                                title={step.title}
                                description={step.description}
                                toolName={step.toolName}
                                aiReasoning={step.aiReasoning}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor; 