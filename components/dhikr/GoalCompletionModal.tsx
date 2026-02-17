'use client';

import React, { useEffect, useState } from 'react';
import { RefreshCw, Trophy, X } from 'lucide-react';

interface GoalCompletionModalProps {
    isOpen: boolean;
    count: number;
    onClose: () => void;
    onReset: () => void;
    onNewGoal: () => void;
}

export default function GoalCompletionModal({ isOpen, count, onClose, onReset, onNewGoal }: GoalCompletionModalProps) {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Construct a simple grid of confetti elements if strictly no external libs,
            // but simpler to use CSS animation on the main container or svg background
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

            {/* Confetti (Simple CSS Particles) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${1 + Math.random()}s`,
                            animationDelay: `${Math.random()}s`
                        }}
                    />
                ))}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`c-${i}`}
                        className="absolute text-2xl animate-bounce"
                        style={{
                            top: `${Math.random() * 50}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random()}s`,
                            animationDelay: `${Math.random()}s`
                        }}
                    >
                        🎉
                    </div>
                ))}
            </div>

            {/* Modal Content */}
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 transform border-4 border-emerald-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 animate-bounce">
                    <Trophy size={40} />
                </div>

                <h2 className="text-3xl font-bold font-amiri text-emerald-800 mb-2">مَاشَاءَ اللّٰهُ</h2>
                <h3 className="text-xl font-bold text-gray-800 mb-1">অভিনন্দন!</h3>
                <p className="text-gray-600 mb-6">আপনি {count} বার জিকির সম্পন্ন করেছেন!</p>

                <div className="space-y-3">
                    <button
                        onClick={onReset}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition active:scale-95 flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} /> আবার শুরু করুন
                    </button>
                    <button
                        onClick={onNewGoal}
                        className="w-full py-3 bg-white text-emerald-700 border border-emerald-200 rounded-xl font-semibold hover:bg-emerald-50 transition active:scale-95"
                    >
                        নতুন লক্ষ্য সেট করুন
                    </button>
                </div>
            </div>
        </div>
    );
}
