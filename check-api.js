async function checkResources() {
    try {
        console.log('Fetching Quran.com resources...');
        const res = await fetch('https://api.quran.com/api/v4/resources/translations');
        const data = await res.json();

        // Filter for Bengali/Bangla
        const bangla = data.translations.filter(t =>
            t.language_name.toLowerCase().includes('bengali') ||
            t.language_name.toLowerCase().includes('bangla')
        );

        console.log('Quran.com Bangla Resources:', JSON.stringify(bangla, null, 2));

        console.log('\nFetching Al-Quran Cloud editions...');
        const res2 = await fetch('https://api.alquran.cloud/v1/edition?type=transliteration');
        const data2 = await res2.json();

        const bangla2 = data2.data.filter(t =>
            t.language.toLowerCase().includes('bn') ||
            t.englishName.toLowerCase().includes('bengali')
        );

        console.log('Al-Quran Cloud Bangla Transliterations:', JSON.stringify(bangla2, null, 2));

    } catch (e) {
        console.error(e);
    }
}

checkResources();
