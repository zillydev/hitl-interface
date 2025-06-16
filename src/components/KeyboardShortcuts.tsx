import React, { useEffect } from 'react';
import { useWorkflowStore } from '../stores/workflowStore';

const KeyboardShortcuts: React.FC = () => {
  const { undo, redo, canUndo, canRedo } = useWorkflowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Handle Ctrl+Z or Cmd+Z (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (canUndo()) {
          undo();
        }
      }

      // Handle Ctrl+Y or Cmd+Y (Redo)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        if (canRedo()) {
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  // This component doesn't render anything
  return null;
};

export default KeyboardShortcuts; 