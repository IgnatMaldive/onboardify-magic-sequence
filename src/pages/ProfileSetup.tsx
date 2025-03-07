
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { toast } from 'sonner';

// Predefined theme colors
const themeColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#10b981' },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { username, setUsername, profileDescription, setProfileDescription, themeColor, setThemeColor } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSave = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    setIsLoading(true);
    
    // Show success notification
    setTimeout(() => {
      setShowNotification(true);
      setIsLoading(false);
      
      // Navigate to store after success
      setTimeout(() => {
        navigate('/store');
      }, 1500);
    }, 800);
  };

  // Update CSS variables when theme color changes
  const updateThemeColor = (color: string) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--primary', color);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-5">
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            <div 
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ 
                background: `linear-gradient(to right, ${themeColor}10, ${themeColor}20)` 
              }}
            >
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_70%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.svg 
                className="w-14 h-14"
                style={{ color: `${themeColor}80` }}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
              </motion.svg>
            </div>
            
            <div className="p-8 pt-14 relative">
              <motion.div 
                className="absolute -top-10 left-8 w-20 h-20 rounded-full border-4 border-card"
                style={{ backgroundColor: `${themeColor}40` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-input border border-border rounded-md text-lg font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your name"
                  />
                  <span style={{ color: themeColor }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </span>
                </div>
                
                <textarea
                  id="profile-description"
                  value={profileDescription}
                  onChange={(e) => setProfileDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground text-sm min-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter your profile description"
                />

                <div className="mt-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">Choose theme color</label>
                  <div className="flex items-center space-x-3">
                    {themeColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => updateThemeColor(color.value)}
                        className={`w-8 h-8 rounded-full transition-all transform ${themeColor === color.value ? 'ring-2 ring-foreground scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        aria-label={`Select ${color.name} theme`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-4 mt-6">
                  {showNotification && (
                    <motion.div 
                      className="text-sm"
                      style={{ color: themeColor }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Profile saved successfully!
                    </motion.div>
                  )}
                  
                  <motion.button
                    onClick={handleSave}
                    className="px-5 py-2 text-primary-foreground font-semibold rounded-md text-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 flex items-center justify-center"
                    style={{ backgroundColor: themeColor }}
                    disabled={isLoading || showNotification}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Profile'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ProfileSetup;
