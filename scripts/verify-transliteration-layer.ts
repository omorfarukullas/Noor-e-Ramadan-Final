import { getUccaron, romanToBanglaUccaron } from '../lib/transliteration-converter';

const tests = [
    // 1. Hardcoded Tests
    {
        name: "Surah 1:1 (Hardcoded)",
        surah: 1,
        ayah: 1,
        input: "Bismi Allahi arrahmani arraheem", // Should be ignored if hardcoded exists
        expected: "বিসমিল্লাহির রাহমানির রাহিম"
    },
    {
        name: "Surah 1:2 (Hardcoded)",
        surah: 1,
        ayah: 2,
        input: "Alhamdu lillahi rabbi alAAalameen",
        expected: "আলহামদু লিল্লাহি রাব্বিল আলামিন"
    },

    // 2. Logic Tests (Roman to Bangla) where API input matters
    {
        name: "Logic: Bismillah (Word Map)",
        surah: 99,
        ayah: 1,
        input: "Bismillahi",
        expected: "বিসমিল্লাহি"
    },
    {
        name: "Logic: Ar-Rahman (Word Map)",
        surah: 99,
        ayah: 1,
        input: "Ar-Rahmani",
        expected: "আর রাহমানি"
    },
    {
        name: "Logic: Basic Digraphs",
        surah: 99,
        ayah: 1,
        input: "khalaq",
        expected: "খালাক"
    },
    // New Failing Cases for Initial/Independent Vowels
    {
        name: "Logic: Initial Vowel A (Asra)",
        surah: 17,
        ayah: 1,
        input: "asra",
        expected: "আসরা" // Current logic likely yields ◌াসরা (dashed circle)
    },
    {
        name: "Logic: Initial Vowel I (Ilal)",
        surah: 17,
        ayah: 1,
        input: "ilal",
        expected: "ইলাল"
    },
    {
        name: "Logic: Initial Vowel A (Aqsal)",
        surah: 17,
        ayah: 1,
        input: "aqsal",
        expected: "আকসাল"
    },
    {
        name: "Logic: Middle Vowel Context (Ayatina)",
        surah: 17,
        ayah: 1,
        input: "ayatina",
        expected: "আয়াতিনা"
    },
    // Double Vowels & Long Vowels
    {
        name: "Logic: Double AA (Subhaana)",
        surah: 17,
        ayah: 1,
        input: "Subhaana",
        expected: "সুবহানা" // Should behave like Subhana
    },
    {
        name: "Logic: Long Vowel Start (Amanar)",
        surah: 2,
        ayah: 285,
        input: "Āmanar",
        expected: "আমানার"
    },
    {
        name: "Logic: Double EE (Lajee)",
        surah: 17,
        ayah: 1,
        input: "lajee",
        expected: "লাজি" // or Laje
    }
];

console.log("Running Transliteration Verification...\n");

let passed = 0;
tests.forEach(test => {
    let result = "";
    if (test.surah && test.ayah) {
        result = getUccaron(test.surah, test.ayah, test.input);
    } else {
        result = romanToBanglaUccaron(test.input);
    }

    const isPass = result === test.expected;
    console.log(`Test: ${test.name}`);
    console.log(`Input: ${test.input}`);
    console.log(`Result:   ${result}`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Status:   ${isPass ? 'PASS' : 'FAIL'}`);
    console.log('---');
    if (isPass) passed++;
});

console.log(`\nPassed ${passed}/${tests.length}`);
