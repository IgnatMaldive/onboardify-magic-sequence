
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define our navigation paths in order
  const paths = ["/signup", "/profile-setup", "/store"];
  const currentIndex = paths.indexOf(location.pathname);
  
  const goBack = () => {
    if (currentIndex > 0) {
      navigate(paths[currentIndex - 1]);
    }
  };
  
  const goForward = () => {
    if (currentIndex < paths.length - 1) {
      navigate(paths[currentIndex + 1]);
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-between px-6 z-10 pointer-events-none">
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-md pointer-events-auto"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </motion.button>
      )}
      
      {currentIndex < paths.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goForward}
          className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-md ml-auto pointer-events-auto"
          aria-label="Go forward"
        >
          <ArrowRight size={18} />
        </motion.button>
      )}
    </div>
  );
};

export default PageNavigation;
