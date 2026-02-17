'use client';

import React from 'react';
import { Volume2, VolumeX, RotateCcw, Settings, History, Info } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"; // Assuming Shadcn/UI sheet exists or I will create a simpler version if not.

// Simplistic Custom Drawer Implementation since we might not have the Sheet component
// If user has shadcn, we would use it. But to be safe, I'll build a custom drawer here using Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsControlProps {
    soundEnabled: boolean;
    onToggleSound: () => void;
    onReset: () => void;
    onUndo: () => void;
    count: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function SettingsControl({ soundEnabled, onToggleSound, onReset, onUndo, count, isOpen, setIsOpen }: SettingsControlProps) {
    return (
        <>
            {/* Quick Actions Toolbar */}
            <div className="flex items-center justify-between gap-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-emerald-50 w-full max-w-sm mx-auto">
                <button
                    onClick={onToggleSound}
                    className={`p-3 rounded-xl transition-all ${soundEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                >
                    {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>

                <div className="h-8 w-px bg-gray-200"></div>

                <div className="flex gap-3">
                    <button
                        onClick={onUndo}
                        disabled={count === 0}
                        className="p-3 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 disabled:opacity-50 transition-colors"
                        title="Undo"
                    >
                        <RotateCcw size={24} className="-scale-x-100" />
                    </button>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                        title="Settings"
                    >
                        <Settings size={24} />
                    </button>
                </div>
            </div>

            {/* Settings Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 p-6 md:max-w-md md:mx-auto"
                        >
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

                            <h3 className="text-xl font-bold text-gray-800 mb-6">Settings & Controls</h3>

                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        onReset();
                                        setIsOpen(false);
                                    }}
                                    className="w-full p-4 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                >
                                    <RotateCcw size={20} />
                                    Reset Counter
                                </button>
                            </div>

                            <p className="text-center text-gray-400 text-xs mt-8">
                                Version 2.0 • Smart Tasbih
                            </p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
