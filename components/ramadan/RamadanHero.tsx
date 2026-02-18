'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RamadanHero() {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
    const [isRamadanStarted, setIsRamadanStarted] = useState(false);

    useEffect(() => {
        // Target date: February 19, 2026
        const targetDate = new Date('2026-02-19T00:00:00+06:00').getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setIsRamadanStarted(false);
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setIsRamadanStarted(true);
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    // Bangla numerals conversion
    const toBangla = (num: number) => {
        return num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);
    };

    return (
        <div className="relative w-full h-[500px] bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] overflow-hidden flex flex-col items-center justify-center text-white text-center px-4 pb-24 md:pb-32">

            {/* Stars Background */}
            <div className="absolute inset-0 w-full h-full">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-70"
                        initial={{ opacity: 0.2, scale: 0.5 }}
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1, 0.5] }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                        }}
                    />
                ))}
            </div>

            {/* Crescent Moon Animation */}
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="mb-6 relative"
            >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-b-8 border-r-8 border-yellow-100/90 shadow-[0_0_50px_rgba(253,224,71,0.3)] transform -rotate-45" />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="z-10"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-bengali mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-100 drop-shadow-lg">
                    মাহে রমজান ২০২৬
                </h1>

                <p className="text-lg md:text-xl text-blue-100 mb-8 font-bangla border-b border-blue-400/30 pb-2 inline-block">
                    ১লা রমযান চাঁদ দেখার উপর নির্ভরশীল
                </p>

                {/* Countdown Timer */}
                {!isRamadanStarted && timeLeft ? (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 rtl:flex-row-reverse">
                        <CountdownUnit value={toBangla(timeLeft.days)} label="দিন" />
                        <CountdownUnit value={toBangla(timeLeft.hours)} label="ঘণ্টা" />
                        <CountdownUnit value={toBangla(timeLeft.minutes)} label="মিনিট" />
                        <CountdownUnit value={toBangla(timeLeft.seconds)} label="সেকেন্ড" />
                    </div>
                ) : (
                    <div className="text-2xl font-bold text-emerald-300 animate-pulse">
                        রমজান মোবারক!
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 min-w-[80px] md:min-w-[100px]">
            <span className="text-3xl md:text-5xl font-bold font-bengali text-white mb-1 shadow-black/20 drop-shadow-sm">
                {value}
            </span>
            <span className="text-sm md:text-base text-blue-200 font-medium">
                {label}
            </span>
        </div>
    );
}
