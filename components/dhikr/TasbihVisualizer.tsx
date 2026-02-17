'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TasbihVisualizerProps {
    progress: number;
    count: number;
    onTap: () => void;
}

export default function TasbihVisualizer({ progress, count, onTap }: TasbihVisualizerProps) {
    // Circle configuration
    const radius = 120;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center py-10">
            {/* Outer Glow */}
            <motion.div
                className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative w-80 h-80 flex items-center justify-center">
                {/* Progress Ring SVG */}
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90 drop-shadow-xl"
                >
                    {/* Background Track */}
                    <circle
                        stroke="#e2e8f0"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />

                    {/* Active Progress */}
                    <motion.circle
                        stroke="#10b981"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    />
                </svg>

                {/* Inner Tap Area */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onTap}
                    className="absolute inset-6 rounded-full bg-gradient-to-br from-emerald-50 to-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center z-10 border border-emerald-100/50 backdrop-blur-sm"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={count} // Animate on change
                            initial={{ scale: 0.5, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.5, opacity: 0, position: 'absolute' }}
                            className="text-7xl font-bold text-emerald-600 tabular-nums tracking-tighter"
                        >
                            {count.toLocaleString('bn-BD')}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-sm font-medium text-emerald-800/60 mt-2 uppercase tracking-widest">Tap to Count</span>
                </motion.button>
            </div>
        </div>
    );
}
