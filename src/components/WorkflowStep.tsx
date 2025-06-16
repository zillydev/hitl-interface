import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { useWorkflowStore } from '../stores/workflowStore';
import { mockRevisionApi } from '../api/mock';
import { ApiError } from '../api/types';

interface WorkflowStepProps {
  id: string;
  title: string;
  description: string;
  toolName: string;
  aiReasoning: string;
  agentName: string;
  confidenceScore: number;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({
  id,
  title,
  description,
  toolName,
  aiReasoning,
  agentName,
  confidenceScore,
  dragHandleProps,
}) => {
  // State
  const [showRevisionBox, setShowRevisionBox] = useState(false);
  const [revisionPrompt, setRevisionPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);

  // Store
  const deleteStep = useWorkflowStore((state) => state.deleteStep);
  const updateStep = useWorkflowStore((state) => state.updateStep);

  // Effects
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [revisionPrompt]);

  useEffect(() => {
    const textarea = descriptionInputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [isEditingDescription, editedDescription]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
      descriptionInputRef.current.select();
    }
  }, [isEditingDescription]);

  // Handlers
  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== title) {
      updateStep(id, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    if (editedDescription.trim() && editedDescription !== description) {
      updateStep(id, { description: editedDescription.trim() });
    }
    setIsEditingDescription(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'title' | 'description') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (type === 'title') {
        handleTitleSave();
      } else {
        handleDescriptionSave();
      }
    } else if (e.key === 'Escape') {
      if (type === 'title') {
        setEditedTitle(title);
        setIsEditingTitle(false);
      } else {
        setEditedDescription(description);
        setIsEditingDescription(false);
      }
    }
  };

  const handleRevisionRequest = async () => {
    if (!revisionPrompt.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await mockRevisionApi.requestRevision({
        stepId: id,
        revisionPrompt: revisionPrompt.trim(),
      });

      setShowRevisionBox(false);
      setRevisionPrompt('');
      updateStep(id, response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || 'Failed to submit revision request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    setError(null);

    try {
      const response = await mockRevisionApi.requestRevision({
        stepId: id,
        revisionPrompt: 'Retry with higher confidence',
      });
      updateStep(id, response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message || 'Failed to retry step');
    } finally {
      setIsRetrying(false);
    }
  };

  const handleStartEditingDescription = () => {
    setIsEditingDescription(true);
    setEditedDescription(description);
    const textarea = descriptionInputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Render helpers
  const renderConfidenceBadge = () => (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${confidenceScore >= 0.9 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
      confidenceScore >= 0.7 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      }`}>
      {Math.round(confidenceScore * 100)}% confidence
    </span>
  );

  const renderRetryButton = () => (
    confidenceScore < 0.5 && (
      <Tooltip label="Retry with higher confidence">
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="px-2 py-1 text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isRetrying ? (
            <>
              <span className="material-icons !text-sm animate-spin">sync</span>
              Retrying...
            </>
          ) : (
            <>
              <span className="material-icons !text-sm">refresh</span>
              Retry
            </>
          )}
        </button>
      </Tooltip>
    )
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => handleKeyDown(e, 'title')}
                className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none px-1 py-0.5"
              />
            ) : (
              <h3
                className="text-lg font-semibold text-gray-900 dark:text-white cursor-text border border-transparent hover:border-gray-200 dark:hover:border-gray-700 px-1 py-0.5 rounded group relative pr-8"
                onClick={() => {
                  setIsEditingTitle(true);
                  setEditedTitle(title);
                }}
              >
                {title}
                <span className="material-icons !text-sm text-gray-400 dark:text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">edit</span>
              </h3>
            )}
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
              {toolName}
            </span>
            <span className="px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full flex items-center gap-1">
              <span className="material-icons !text-sm">smart_toy</span>
              {agentName}
            </span>
            <div className="flex items-center gap-2">
              {renderConfidenceBadge()}
              {renderRetryButton()}
            </div>
          </div>

          {isEditingDescription ? (
            <textarea
              ref={descriptionInputRef}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleDescriptionSave}
              onKeyDown={(e) => handleKeyDown(e, 'description')}
              className="w-full text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none px-1 py-1 mb-4 resize-none min-h-[24px] max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              rows={1}
            />
          ) : (
            <p
              className="text-gray-600 dark:text-gray-300 mb-4 cursor-text border border-transparent hover:border-gray-200 dark:hover:border-gray-700 px-1 py-0.5 rounded whitespace-pre-wrap group relative pr-8"
              onClick={handleStartEditingDescription}
            >
              {description}
              <span className="material-icons !text-sm text-gray-400 dark:text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">edit</span>
            </p>
          )}

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
              <div className="flex flex-col gap-2">
                {error && (
                  <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
                    <span className="material-icons !text-lg">error_outline</span>
                    {error}
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Tooltip label="Cancel revision request">
                    <button
                      onClick={() => {
                        setShowRevisionBox(false);
                        setRevisionPrompt('');
                        setError(null);
                      }}
                      disabled={isSubmitting}
                      className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </Tooltip>
                  <Tooltip label="Submit revision request to AI">
                    <button
                      onClick={handleRevisionRequest}
                      disabled={isSubmitting || !revisionPrompt.trim()}
                      className="px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-icons !text-lg animate-spin">sync</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span className="material-icons !text-lg">auto_awesome</span>
                          Request Revision
                        </>
                      )}
                    </button>
                  </Tooltip>
                </div>
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