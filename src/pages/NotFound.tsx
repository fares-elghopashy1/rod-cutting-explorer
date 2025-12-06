import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: Page not found");
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="inline-flex p-4 rounded-2xl bg-destructive/10 mb-6"
        >
          <AlertCircle className="w-12 h-12 text-destructive" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page seems to have been cut too short.
        </p>
        
        <Link to="/">
          <Button className="hero-gradient text-white">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
