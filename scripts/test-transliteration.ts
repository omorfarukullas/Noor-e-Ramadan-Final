
import { romanToBangla } from '../lib/transliteration-converter';

const testCases = [
    { input: "Bismi Allahi arrahmani arraheem", expected: "বিসমিল্লাহির রাহমানির রাহিম" },
    { input: "Alhamdu lillahi rabbi alAAalameen", expected: "আলহামদুলিল্লাহি রাব্বিল আলামিন" },
    { input: "Arrahmani arraheem", expected: "আর রাহমানির রাহিম" },
    { input: "Maliki yawmi addeen", expected: "মালিকি ইয়াওমিদ্দিন" },
    { input: "Iyyaka naAAbudu wa-iyyaka nastaAAeen", expected: "ইফয়াকা নাবুদু ওয়া ইয়াকা নাস্তাইন" }, // Approximate check
    { input: "Ihdina assirata almustaqeem", expected: "ইহদিনাস সিরাতাল মুস্তাকিম" },
    { input: "Sirata allatheena anAAamta AAalayhim", expected: "সিরাতাল্লাজিনা আনআমতা আলাইহিম" },
    { input: "ghayri almaghdoobi AAalayhim wala addalleen", expected: "গাইরিল মাগদুবি আলাইহিম ওয়ালাদ দাল্লিন" }
];

console.log("Running Transliteration Tests...\n");

let passed = 0;
testCases.forEach((test, index) => {
    const result = romanToBangla(test.input);
    const isMatch = result === test.expected; // Strict match might be hard, we can inspect visually

    console.log(`Test ${index + 1}:`);
    console.log(`Input:    ${test.input}`);
    console.log(`Output:   ${result}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Status:   ${isMatch ? 'PASS' : 'FAIL'}`);
    console.log('-----------------------------------');

    if (isMatch) passed++;
});

console.log(`\nResult: ${passed}/${testCases.length} Passed`);
