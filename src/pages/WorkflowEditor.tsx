import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../widgets/DarkModeToggle';
import WorkflowStep from '../components/WorkflowStep';
import Tooltip from '../components/Tooltip';
import { DragDropContext, Draggable, Droppable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { useWorkflowStore } from '../stores/workflowStore';
import WorkflowConfirmationModal from '../components/WorkflowConfirmationModal';

const WorkflowEditor: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title || '');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { steps, reorderSteps, undo, redo, canUndo, canRedo } = useWorkflowStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderSteps(result.source.index, result.destination.index);
  };

  const handleApprove = () => {
    // TODO: Implement workflow execution logic
    console.log('Workflow approved, executing steps:', steps);
    // Navigate to success page or dashboard
    navigate('/');
  };

  const handleReject = () => {
    // TODO: Implement workflow rejection logic
    console.log('Workflow rejected');
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="w-full p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
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
              <div className="flex items-center gap-4">
                <Tooltip label="Undo (Ctrl+Z)">
                  <button
                    onClick={undo}
                    disabled={!canUndo()}
                    className="flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Undo"
                  >
                    <span className="material-icons !text-xl">undo</span>
                  </button>
                </Tooltip>
                <Tooltip label="Redo (Ctrl+Y)">
                  <button
                    onClick={redo}
                    disabled={!canRedo()}
                    className="flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Redo"
                  >
                    <span className="material-icons !text-xl">redo</span>
                  </button>
                </Tooltip>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="w-full p-4">
          <div className="max-w-7xl mx-auto">
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
                                  id={step.id}
                                  title={step.title}
                                  description={step.description}
                                  toolName={step.toolName}
                                  aiReasoning={step.aiReasoning}
                                  dragHandleProps={provided.dragHandleProps}
                                  agentName={step.agentName}
                                  confidenceScore={step.confidenceScore}
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
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button
          onClick={handleReject}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-transform hover:scale-105"
        >
          <span className="material-icons !text-xl mr-2">close</span>
          Reject
        </button>
        <button
          onClick={() => setIsConfirmationModalOpen(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-transform hover:scale-105"
        >
          <span className="material-icons !text-xl mr-2">visibility</span>
          Review Workflow
        </button>
      </div>

      <WorkflowConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onApprove={handleApprove}
      />
    </div>
  );
};

export default WorkflowEditor; 