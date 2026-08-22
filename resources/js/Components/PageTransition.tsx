import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        y: -20,
    },
};

const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.3,
};

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger children animation
export function StaggerContainer({ children, className = '' }: PageTransitionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = '', delay = 0 }: PageTransitionProps & { delay?: number }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={itemVariants} transition={{ delay }} className={className}>
            {children}
        </motion.div>
    );
}

// Fade in animation
export function FadeIn({ children, delay = 0, className = '' }: PageTransitionProps & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Slide in animation
export function SlideIn({ 
    children, 
    direction = 'left',
    delay = 0,
    className = '' 
}: PageTransitionProps & { direction?: 'left' | 'right' | 'up' | 'down'; delay?: number }) {
    const directions = {
        left: { x: -50, y: 0 },
        right: { x: 50, y: 0 },
        up: { x: 0, y: 50 },
        down: { x: 0, y: -50 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Scale animation
export function ScaleIn({ children, delay = 0, className = '' }: PageTransitionProps & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Claymorphism bounce animation for playful UI
export function ClayBounce({ children, delay = 0, className = '' }: PageTransitionProps & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                duration: 0.5, 
                delay,
                type: 'spring',
                stiffness: 300,
                damping: 20
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Soft float animation for cards
export function FloatIn({ children, delay = 0, className = '' }: PageTransitionProps & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.6, 
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Pop animation for buttons and interactive elements
export function PopIn({ children, delay = 0, className = '' }: PageTransitionProps & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
                duration: 0.3, 
                delay,
                type: 'spring',
                stiffness: 400,
                damping: 15
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered grid animation for cards
export function StaggerGrid({ children, className = '' }: PageTransitionProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={className}
        >
            {React.Children.map(children, (child) => (
                <motion.div 
                    variants={itemVariants}
                    transition={{
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

// Hover effect wrapper for claymorphism cards
export function ClayCard({ children, className = '' }: PageTransitionProps) {
    return (
        <motion.div
            whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Sidebar slide animation
export function SidebarSlide({ children, isOpen, className = '' }: PageTransitionProps & { isOpen: boolean }) {
    return (
        <motion.div
            initial={false}
            animate={{ x: isOpen ? 0 : -256 }}
            transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
