import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ChatbotPage from './pages/ChatbotPage';
import WorkflowEditor from './pages/WorkflowEditor';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<ChatbotPage />} />
            <Route path="/workflow/:title" element={<WorkflowEditor />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;