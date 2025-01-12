// components/Hero.tsx
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <motion.h1
        className="text-6xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Smarter Forms, with React & Zod 🚀
      </motion.h1>
      
      <motion.p
        className="text-xl text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Learn how to create dynamic, user-friendly forms with validation using
        modern tools like Zod and React Hook Form. Dive into clean, efficient,
        and scalable code for your next project.
      </motion.p>
    </div>
  );
};

export default Hero;
