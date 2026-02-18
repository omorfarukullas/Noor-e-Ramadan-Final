'use client';

import React, { useState, useEffect } from 'react';
import { Dhikr } from '@/lib/dhikr-data';
import DhikrSelector from './DhikrSelector';
import GoalCompletionModal from './GoalCompletionModal';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface TasbihCounterProps {
    dhikrs: Dhikr[];
}

export default function TasbihCounter({ dhikrs }: TasbihCounterProps) {
    // State
    const [selectedId, setSelectedId] = useState(1);
    const [count, setCount] = useState(0);
    const [goal, setGoal] = useState(33);
    const [customGoalMode, setCustomGoalMode] = useState(false);

    const [showFazilat, setShowFazilat] = useState(true);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);

    // Derived
    const selectedDhikr = dhikrs.find(d => d.id === selectedId) || dhikrs[0];
    const progress = Math.min((count / goal) * 100, 100);
    const isCompleted = count >= goal;

    // Load Persistence
    useEffect(() => {
        // Load count for specific dhikr
        const savedCount = localStorage.getItem(`tasbih_count_${selectedId}`);
        if (savedCount) setCount(parseInt(savedCount));
        else setCount(0); // Reset count when switching dhikr if not saved

        // Load goal (global preference)
        const savedGoal = localStorage.getItem('tasbih_goal');
        if (savedGoal) setGoal(parseInt(savedGoal));

    }, [selectedId]);

    // Handle Tap
    const handleTap = () => {
        if (isCompleted) return;

        const newCount = count + 1;
        setCount(newCount);

        localStorage.setItem(`tasbih_count_${selectedId}`, newCount.toString());

        if (navigator.vibrate) navigator.vibrate(50);

        if (newCount === goal) {
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            setShowGoalModal(true);
        }
    };

    const confirmReset = () => {
        setCount(0);
        localStorage.setItem(`tasbih_count_${selectedId}`, '0');
    };

    const handleGoalChange = (newGoal: number) => {
        setGoal(newGoal);
        setCustomGoalMode(false);
        localStorage.setItem('tasbih_goal', newGoal.toString());
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-slate-50 relative font-sans">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {/* Top Section: Selector */}
            <DhikrSelector dhikrs={dhikrs} selectedId={selectedId} onSelect={setSelectedId} />

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200">
                <div className="min-h-full flex flex-col items-center p-4 pb-32 max-w-xl mx-auto w-full">

                    {/* Dhikr Info Card */}
                    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-emerald-50 mb-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-amiri font-bold text-emerald-800 mb-3 drop-shadow-sm leading-relaxed">
                            {selectedDhikr.arabic}
                        </h2>
                        <div className="space-y-1 mb-4">
                            <p className="text-lg font-medium text-gray-800">{selectedDhikr.uchcharon}</p>
                            <p className="text-sm text-gray-500 italic">{selectedDhikr.meaning}</p>
                        </div>

                        <div className={`transition-all duration-300 overflow-hidden ${showFazilat ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-emerald-50/50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed text-left border border-emerald-100">
                                <span className="font-semibold text-emerald-700 block mb-1">ফজিলত:</span>
                                {selectedDhikr.fazilat}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowFazilat(!showFazilat)}
                            className="mt-2 text-xs font-medium text-emerald-500 hover:text-emerald-700 flex items-center justify-center gap-1 mx-auto"
                        >
                            {showFazilat ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {showFazilat ? 'বিস্তারিত লুকান' : 'বিস্তারিত দেখুন'}
                        </button>
                    </div>

                    {/* COUNTER AREA */}
                    <div className="w-full flex flex-col items-center gap-6">

                        {/* Goal Status & Percentage */}
                        <div className="flex items-center justify-between w-full px-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Goal</span>
                                <span className="text-lg font-bold text-emerald-700">{toBanglaNumber(goal)}</span>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</span>
                                <span className="text-lg font-bold text-emerald-700">{toBanglaNumber(Math.round(progress))}%</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* RECTANGLE COUNTER BUTTON (GREEN) */}
                        <button
                            onClick={handleTap}
                            disabled={isCompleted}
                            className={`
                                w-full h-40 rounded-3xl relative overflow-hidden transition-all duration-100 active:scale-[0.98]
                                shadow-lg hover:shadow-xl group flex items-center justify-center
                                ${isCompleted
                                    ? 'bg-emerald-800 cursor-not-allowed opacity-80'
                                    : 'bg-emerald-600 hover:bg-emerald-700 border-2 border-emerald-600'
                                }
                            `}
                        >
                            {/* Ripple Effect Background */}
                            <div className={`absolute inset-0 bg-emerald-50 opacity-0 group-active:opacity-100 transition-opacity duration-200`} />

                            <div className="z-10 flex flex-col items-center justify-center">
                                {isCompleted ? (
                                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-emerald-800 font-bold text-xl">Completed!</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-6xl font-bold tabular-nums drop-shadow-md text-white">
                                            {toBanglaNumber(count)}
                                        </span>
                                        <span className="text-sm font-medium text-emerald-100 mt-2 uppercase tracking-widest opacity-80">
                                            Tap to Count
                                        </span>
                                    </>
                                )}
                            </div>
                        </button>

                        {/* CONTROLS: Reset & Goal Quick Sets */}
                        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid gap-4">

                            {/* Inline Reset Confirmation */}
                            {showResetConfirm ? (
                                <div className="flex items-center justify-between bg-red-50 p-2 rounded-xl animate-in fade-in slide-in-from-top-1">
                                    <span className="text-sm font-medium text-red-600 ml-2">Reset Count?</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowResetConfirm(false)}
                                            className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                                        >
                                            No
                                        </button>
                                        <button
                                            onClick={() => {
                                                confirmReset();
                                                setShowResetConfirm(false);
                                            }}
                                            className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-sm"
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
                                    <span>Quick Goal Set:</span>
                                    <button
                                        onClick={() => setShowResetConfirm(true)}
                                        className="text-red-500 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Reset Count
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-5 gap-2">
                                {[10, 33, 34, 99, 100].map(g => (
                                    <button
                                        key={g}
                                        onClick={() => handleGoalChange(g)}
                                        className={`
                                            h-10 rounded-xl text-sm font-bold border transition-all
                                            ${goal === g
                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                                : 'bg-gray-50 text-gray-600 border-transparent hover:border-emerald-200 hover:bg-white'
                                            }
                                        `}
                                    >
                                        {toBanglaNumber(g)}
                                    </button>
                                ))}
                            </div>

                            {/* Optimized Custom Goal Input */}
                            <div className="flex gap-2 relative">
                                <div className="relative flex-1 group">
                                    <input
                                        type="number"
                                        placeholder="Custom Goal..."
                                        className="w-full pl-3 pr-12 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = parseInt((e.target as HTMLInputElement).value);
                                                if (val > 0) {
                                                    handleGoalChange(val);
                                                    (e.target as HTMLInputElement).blur();
                                                }
                                            }
                                        }}
                                        defaultValue={customGoalMode ? goal : ''}
                                    />
                                    <button
                                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                                        onClick={(e) => {
                                            const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                                            const val = parseInt(input.value);
                                            if (val > 0) {
                                                handleGoalChange(val);
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        Set
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Helper Modals/Extras could go here */}
            {/* Completion Modal */}
            <GoalCompletionModal
                isOpen={showGoalModal}
                count={count}
                onClose={() => setShowGoalModal(false)}
                onReset={() => {
                    setCount(0);
                    setShowGoalModal(false);
                }}
                onNewGoal={() => setShowGoalModal(false)}
            />
        </div >
    );
}
