'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dhikr } from '@/lib/dhikr-data';
import DhikrSelector from './DhikrSelector';
import GoalCompletionModal from './GoalCompletionModal';
import SettingsControl from './SettingsControl';
import TasbihVisualizer from './TasbihVisualizer';
import { ChevronDown, ChevronUp, Edit2, Timer, Activity } from 'lucide-react';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface TasbihCounterProps {
    dhikrs: Dhikr[];
}

export default function TasbihCounter({ dhikrs }: TasbihCounterProps) {
    // State
    const [selectedId, setSelectedId] = useState(1);
    const [count, setCount] = useState(0);
    const [goal, setGoal] = useState(33);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showFazilat, setShowFazilat] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Session Stats State
    const [startTime, setStartTime] = useState<number | null>(null);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [tapsInSession, setTapsInSession] = useState(0);

    // References
    const beepRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Derived
    const selectedDhikr = dhikrs.find(d => d.id === selectedId) || dhikrs[0];
    const progress = Math.min((count / goal) * 100, 100);

    // BPM Calculation
    const bpm = sessionDuration > 0 ? Math.round((tapsInSession / sessionDuration) * 60) : 0;

    // Format Duration
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Initialize Audio
    useEffect(() => {
        beepRef.current = new Audio('/sounds/click.mp3');
    }, []);

    // Timer Logic
    useEffect(() => {
        if (startTime && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTime]);

    // Load Persistence
    useEffect(() => {
        const savedCount = localStorage.getItem(`tasbih_count_${selectedId}`);
        if (savedCount) setCount(parseInt(savedCount));
        else setCount(0);

        const savedGoal = localStorage.getItem('tasbih_goal');
        if (savedGoal) setGoal(parseInt(savedGoal));

        const savedSound = localStorage.getItem('tasbih_sound');
        if (savedSound) setSoundEnabled(savedSound === 'true');
    }, [selectedId]);

    // Play Sound Helper
    const playSound = () => {
        if (soundEnabled) {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }
    };

    // Handle Tap
    const handleTap = () => {
        if (!startTime) setStartTime(Date.now());

        const newCount = count + 1;
        setCount(newCount);
        setTapsInSession(prev => prev + 1);

        localStorage.setItem(`tasbih_count_${selectedId}`, newCount.toString());

        if (navigator.vibrate) navigator.vibrate(50);
        playSound();

        if (newCount === goal) {
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            setShowGoalModal(true);
        }
    };

    const resetCount = () => {
        if (confirm('আপনি কি নিশ্চিত? কাউন্ট এবং সেশন রিসেট হবে।')) {
            setCount(0);
            setStartTime(null);
            setSessionDuration(0);
            setTapsInSession(0);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            localStorage.setItem(`tasbih_count_${selectedId}`, '0');
        }
    };

    const handleUndo = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            localStorage.setItem(`tasbih_count_${selectedId}`, newCount.toString());
        }
    };

    const handleGoalChange = (newGoal: number) => {
        setGoal(newGoal);
        localStorage.setItem('tasbih_goal', newGoal.toString());
    };

    const handleCustomGoal = () => {
        const input = prompt('আপনার লক্ষ্য সেট করুন (সংখ্যায় লিখুন):', goal.toString());
        if (input) {
            const parsed = parseInt(input);
            if (!isNaN(parsed) && parsed > 0) {
                handleGoalChange(parsed);
            }
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-slate-50 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {/* Top Section: Selector + Stats */}
            <div className="flex-none z-20 bg-white/80 backdrop-blur-md border-b border-emerald-100/50 shadow-sm">
                <DhikrSelector dhikrs={dhikrs} selectedId={selectedId} onSelect={setSelectedId} />

                {/* Session Monitor */}
                <div className="flex justify-center gap-6 py-2 text-xs text-emerald-600 bg-emerald-50/30">
                    <div className="flex items-center gap-1">
                        <Timer size={12} />
                        <span>{toBanglaNumber(formatTime(sessionDuration))}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Activity size={12} />
                        <span>{toBanglaNumber(bpm)} BPM</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200">
                <div className="min-h-full flex flex-col items-center p-4 pb-48 max-w-lg mx-auto w-full">
                    {/* Dhikr Info */}
                    <div className="text-center w-full mt-4 space-y-4 mb-8">
                        <h2 className="text-3xl md:text-5xl font-amiri font-bold text-emerald-800 leading-relaxed drop-shadow-sm px-2 animate-in fade-in zoom-in duration-500">
                            {selectedDhikr.arabic}
                        </h2>
                        <div className="space-y-1">
                            <p className="text-lg font-medium text-gray-800">{selectedDhikr.uchcharon}</p>
                            <p className="text-sm text-gray-500">{selectedDhikr.meaning}</p>
                        </div>

                        <button
                            onClick={() => setShowFazilat(!showFazilat)}
                            className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center mx-auto gap-1 hover:bg-emerald-100 transition-colors"
                        >
                            {showFazilat ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            {showFazilat ? 'ফজিলত লুকান' : 'ফজিলত দেখুন'}
                        </button>
                        {showFazilat && (
                            <div className="text-sm text-gray-600 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm animate-in slide-in-from-top-2 mx-4 text-left leading-relaxed">
                                {selectedDhikr.fazilat}
                            </div>
                        )}
                    </div>

                    {/* VISUALIZER - The Core Smart Feature */}
                    <TasbihVisualizer
                        progress={progress}
                        count={count}
                        onTap={handleTap}
                    />
                </div>
            </div>

            {/* Floating Settings Drawer Trigger / Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 pb-safe">
                {/* Goal Progress Bar (Mini) */}
                <div className="h-1 w-full bg-emerald-100">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Goal Controls */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-emerald-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Goal Target</span>
                        <span className="text-xl font-bold text-emerald-700">{toBanglaNumber(goal)}</span>
                    </div>

                    <div className="flex gap-2">
                        {[33, 100].map(g => (
                            <button
                                key={g}
                                onClick={() => handleGoalChange(g)}
                                className={`w-10 h-10 rounded-full text-xs font-bold border transition-all ${goal === g ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-105' : 'bg-white text-gray-400 border-gray-200 hover:border-emerald-300'
                                    }`}
                            >
                                {toBanglaNumber(g)}
                            </button>
                        ))}
                        <button
                            onClick={handleCustomGoal}
                            className="w-10 h-10 rounded-full bg-white border border-gray-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-50 transition-colors"
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Control Center */}
                <SettingsControl
                    soundEnabled={soundEnabled}
                    onToggleSound={() => {
                        const newVal = !soundEnabled;
                        setSoundEnabled(newVal);
                        localStorage.setItem('tasbih_sound', newVal.toString());
                    }}
                    onReset={resetCount}
                    onUndo={handleUndo}
                    count={count}
                    isOpen={isSettingsOpen}
                    setIsOpen={setIsSettingsOpen}
                />
            </div>

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
        </div>
    );
}
