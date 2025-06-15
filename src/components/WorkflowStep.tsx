import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { useWorkflowStore } from '../stores/workflowStore';

interface WorkflowStepProps {
  id: string;
  title: string;
  description: string;
  toolName: string;
  aiReasoning: string;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  id,
  title,
  description,
  toolName,
  aiReasoning,
  dragHandleProps,
}) => {
  const [showRevisionBox, setShowRevisionBox] = useState(false);
  const [revisionPrompt, setRevisionPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const deleteStep = useWorkflowStore((state) => state.deleteStep);
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set the height to scrollHeight to fit content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [revisionPrompt]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
              {toolName}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">AI Reasoning:</span> {aiReasoning}
            </p>
          </div>

          {showRevisionBox && (
            <div className="mt-4">
              <textarea
                ref={textareaRef}
                value={revisionPrompt}
                onChange={(e) => setRevisionPrompt(e.target.value)}
                placeholder="Describe how you'd like to revise this step..."
                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 resize-none min-h-[36px] max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                rows={1}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Tooltip label="Cancel revision request">
                  <button
                    onClick={() => {
                      setShowRevisionBox(false);
                      setRevisionPrompt('');
                    }}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </Tooltip>
                <Tooltip label="Submit revision request to AI">
                  <button
                    onClick={() => {
                      // Handle AI revision request
                      setShowRevisionBox(false);
                      setRevisionPrompt('');
                    }}
                    className="px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-icons !text-lg">auto_awesome</span>
                    Request Revision
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <Tooltip label="Delete this step">
            <button
              onClick={() => deleteStep(id)}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="material-icons !text-xl">delete</span>
            </button>
          </Tooltip>
          <Tooltip label="Drag to reorder">
            <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing">
              <button
                ref={dragHandleRef}
                className="cursor-grab active:cursor-grabbing p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="material-icons !text-xl">drag_indicator</span>
              </button>
            </div>
          </Tooltip>
          <Tooltip label={showRevisionBox ? "Close revision request" : "Ask AI to revise this step"}>
            <button
              onClick={() => setShowRevisionBox(!showRevisionBox)}
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="material-icons !text-xl">auto_awesome</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep; 