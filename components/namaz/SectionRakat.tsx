import React from 'react';
import { RAKAT_DATA } from '@/lib/namaz-data';
import { toBanglaNumber } from '@/lib/bangla-utils';

export default function SectionRakat() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-emerald-50 text-emerald-800 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-4 py-3">ওয়াক্ত</th>
                                <th className="px-4 py-3 text-center">সুন্নত (আগে)</th>
                                <th className="px-4 py-3 text-center">ফরজ</th>
                                <th className="px-4 py-3 text-center">সুন্নত (পরে)</th>
                                <th className="px-4 py-3 text-center">নফল/বিতর</th>
                                <th className="px-4 py-3 text-center font-extrabold text-emerald-900 border-l border-emerald-100">মোট</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {RAKAT_DATA.map((row, idx) => (
                                <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-gray-900">{row.waqt}</td>

                                    <td className="px-4 py-4 text-center">
                                        {row.sunnah_muakkada_pre ? (
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold text-xs">{toBanglaNumber(row.sunnah_muakkada_pre)}</span>
                                        ) : '-'}
                                    </td>

                                    <td className="px-4 py-4 text-center">
                                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md font-bold text-xs">{toBanglaNumber(row.farz)}</span>
                                    </td>

                                    <td className="px-4 py-4 text-center">
                                        {row.sunnah_muakkada_post ? (
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold text-xs">{toBanglaNumber(row.sunnah_muakkada_post)}</span>
                                        ) : '-'}
                                    </td>

                                    <td className="px-4 py-4 text-center space-x-1">
                                        {row.witr && (
                                            <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md font-bold text-xs" title="Witr">{toBanglaNumber(row.witr)} (বে)</span>
                                        )}
                                        {row.nafl_post && (
                                            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-bold text-xs">{toBanglaNumber(row.nafl_post)} (ন)</span>
                                        )}
                                        {!row.witr && !row.nafl_post && '-'}
                                    </td>

                                    <td className="px-4 py-4 text-center font-bold text-emerald-600 text-lg border-l border-emerald-50">
                                        {toBanglaNumber(row.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-200 rounded-sm"></span>
                    <span>ফরজ</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-200 rounded-sm"></span>
                    <span>সুন্নত</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-200 rounded-sm"></span>
                    <span>বিতর</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-200 rounded-sm"></span>
                    <span>নফল</span>
                </div>
            </div>
        </div>
    );
}
