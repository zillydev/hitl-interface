import React from 'react';
import { useWorkflowStore } from '../stores/workflowStore';
import { AnimatePresence, motion } from 'framer-motion';

interface WorkflowConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
}

const WorkflowConfirmationModal: React.FC<WorkflowConfirmationModalProps> = ({
  isOpen,
  onClose,
  onApprove,
}) => {
  const { steps } = useWorkflowStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl pointer-events-auto"
              >
                <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Workflow Review
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Please review the following workflow steps before proceeding. Once approved, the workflow will be executed.
                      </p>

                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {steps.map((step, index) => (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="ml-4">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{step.title}</h4>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line break-words">
                                  {step.description}
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
                                    {step.toolName}
                                  </span>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                                    <span className="material-icons !text-xs mr-1">smart_toy</span>
                                    {step.agentName}
                                  </span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${step.confidenceScore >= 0.9 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                    step.confidenceScore >= 0.7 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                    }`}>
                                    {Math.round(step.confidenceScore * 100)}% confidence
                                  </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                                  AI Reasoning: {step.aiReasoning}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onApprove}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Approve & Execute
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WorkflowConfirmationModal; 