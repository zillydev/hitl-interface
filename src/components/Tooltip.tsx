import React, { useState } from 'react';
import {
  useFloating,
  useHover,
  useInteractions,
  FloatingPortal,
  offset,
  shift,
  flip,
  autoUpdate,
} from '@floating-ui/react';

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ label, children, delay = 100 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(5),
      flip(),
      shift()
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom', // Base placement
  });

  const hover = useHover(context, {
    delay: {
      open: delay,
      close: 0,
    },
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg transition-opacity duration-100"
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip; 