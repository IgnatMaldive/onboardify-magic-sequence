
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { useEffect } from 'react';

const Store = () => {
  const { username, profileDescription, themeColor, bannerImage } = useUser();

  // Apply theme color when component mounts
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColor);
    
    // Clean up when component unmounts
    return () => {
      document.documentElement.style.setProperty('--primary', '#3b82f6'); // Reset to default
    };
  }, [themeColor]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
                <div className="border-b border-border px-4 py-3">
                  <div className="font-medium">CryptoStore_{username.split(' ')[0]}</div>
                  <small className="text-muted-foreground">Last login: Just now</small>
                </div>
                
                <div 
                  className="h-40 flex items-center justify-center"
                  style={{ 
                    background: bannerImage 
                      ? `url(${bannerImage}) center/cover no-repeat` 
                      : `linear-gradient(to right, ${themeColor}10, ${themeColor}20)` 
                  }}
                >
                  {!bannerImage && (
                    <svg className="w-10 h-10" style={{ color: `${themeColor}60` }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="3" x2="21" y2="21"></line>
                      <line x1="21" y1="3" x2="3" y2="21"></line>
                    </svg>
                  )}
                </div>
                
                <div className="p-6 pt-14 relative">
                  <div 
                    className="absolute -top-10 left-6 w-20 h-20 rounded-full border-4 border-card"
                    style={{ backgroundColor: `${themeColor}30` }}
                  ></div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold">{username}'s NFT Emporium</h2>
                    <p className="text-muted-foreground mt-1">{profileDescription.substring(0, 60)}...</p>
                    <small className="text-muted">user.eth • Joined {new Date().getFullYear()}</small>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-6 mb-6 border-b border-border pb-2">
                <a href="#" className="text-foreground font-medium border-b-2 border-foreground pb-2">Products</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <motion.div 
                    key={item}
                    className="aspect-square bg-card border border-border rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    style={{ 
                      borderColor: `${themeColor}30`,
                      borderWidth: '1px'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: `${themeColor}`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/30">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="3" x2="21" y2="21"></line>
                      <line x1="21" y1="3" x2="3" y2="21"></line>
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-3">Now Playing</h3>
                <p className="text-sm mb-3">Crypto Beats - NFT Anthem</p>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full" 
                    style={{ backgroundColor: themeColor }}
                    initial={{ width: "0%" }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <small className="text-muted-foreground">1:24</small>
                  <small className="text-muted-foreground">3:45</small>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Friends</h3>
                  <small className="text-muted-foreground">3 online</small>
                </div>
                
                <div className="space-y-3">
                  {["CryptoArtist", "NFTCollector", "PixelPunks"].map((friend, index) => (
                    <motion.div 
                      key={friend}
                      className="flex items-center space-x-3"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <span className="text-sm">{friend}</span>
                      <div 
                        className="w-2 h-2 rounded-full ml-auto"
                        style={{ backgroundColor: themeColor }}
                      ></div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium mb-3">Store Stats</h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <div className="text-sm">Total Sales</div>
                  <div className="text-sm font-medium text-right">0 ETH</div>
                  <div className="text-sm">Products</div>
                  <div className="text-sm font-medium text-right">3</div>
                  <div className="text-sm">Followers</div>
                  <div className="text-sm font-medium text-right">0</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Store;
