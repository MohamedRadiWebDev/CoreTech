import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const viewport = { once: true, amount: 0.2 };

export function FadeIn({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
