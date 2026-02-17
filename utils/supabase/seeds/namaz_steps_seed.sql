-- Noor e Ramadan - Namaz Steps Seed Data
-- Complete step-by-step guide for Wudu and Prayers
-- Execute this in Supabase SQL Editor after running schema.sql

INSERT INTO namaz_steps (
  prayer_name_bangla,
  prayer_name_english,
  step_number,
  step_title_bangla,
  step_title_english,
  step_description_bangla,
  step_description_english,
  arabic_text,
  bangla_transliteration,
  english_transliteration,
  translation_bangla,
  translation_english
) VALUES

-- WUDU STEPS
('ওযু', 'Wudu (Ablution)', 1, 'নিয়ত করা', 'Intention',
'মনে মনে ওযুর নিয়ত করুন। আল্লাহর সন্তুষ্টির জন্য পবিত্রতা অর্জন করছি।',
'Make intention in your heart. I am purifying myself for the sake of Allah''s pleasure.',
'نَوَيْتُ أَنْ أَتَوَضَّأَ لِلصَّلَاةِ',
'নাওয়াইতু আন আতাওয়াদ্দয়া লিস সালাহ',
'Nawaytu an atawaddaa lis-salah',
'আমি নামাজের জন্য ওযু করার নিয়ত করছি',
'I intend to perform ablution for prayer'),

('ওযু', 'Wudu (Ablution)', 2, 'বিসমিল্লাহ পড়া', 'Recite Bismillah',
'ওযু শুরু করার আগে "বিসমিল্লাহ" বলুন।',
'Say "Bismillah" before starting ablution.',
'بِسْمِ اللهِ',
'বিসমিল্লাহ',
'Bismillah',
'আল্লাহর নামে',
'In the name of Allah'),

('ওযু', 'Wudu (Ablution)', 3, 'হাত ধোয়া', 'Wash Hands',
'কব্জি পর্যন্ত তিনবার দুই হাত ধুয়ে নিন। প্রথমে ডান হাত তারপর বাম হাত।',
'Wash both hands up to the wrists three times. Right hand first, then left hand.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 4, 'কুলি করা', 'Rinse Mouth',
'তিনবার কুলি করুন। প্রতিবার পানি নিয়ে মুখের ভিতরে ভালোভাবে ঘোরান।',
'Rinse your mouth three times. Take water and swish it thoroughly inside your mouth each time.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 5, 'নাকে পানি দেওয়া', 'Clean Nose',
'ডান হাতে পানি নিয়ে নাকে দিন এবং বাম হাত দিয়ে নাক পরিষ্কার করুন। এটি তিনবার করুন।',
'Take water with right hand, put in nose and clean with left hand. Do this three times.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 6, 'মুখমণ্ডল ধোয়া', 'Wash Face',
'তিনবার পুরো মুখমণ্ডল ধুয়ে নিন। কপাল থেকে থুতনি পর্যন্ত এবং এক কানের লতি থেকে অন্য কানের লতি পর্যন্ত।',
'Wash your entire face three times. From forehead to chin and from one earlobe to the other.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 7, 'হাত ধোয়া', 'Wash Arms',
'কনুই পর্যন্ত তিনবার দুই হাত ধুয়ে নিন। প্রথমে ডান হাত তারপর বাম হাত।',
'Wash both arms up to elbows three times. Right arm first, then left arm.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 8, 'মাথা মাসেহ করা', 'Wipe Head',
'ভেজা হাত দিয়ে একবার মাথা মাসেহ করুন। সামনে থেকে পেছনে এবং পেছন থেকে সামনে।',
'Wipe your head once with wet hands. From front to back and back to front.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 9, 'কান মাসেহ করা', 'Wipe Ears',
'তর্জনী আঙুল দিয়ে কানের ভিতর এবং বুড়ো আঙুল দিয়ে কানের পেছন মাসেহ করুন।',
'Wipe inside of ears with index fingers and back of ears with thumbs.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 10, 'পা ধোয়া', 'Wash Feet',
'গিরা পর্যন্ত তিনবার দুই পা ধুয়ে নিন। প্রথমে ডান পা তারপর বাম পা। আঙুলগুলোর মাঝে খিলাল করুন।',
'Wash both feet up to ankles three times. Right foot first, then left foot. Clean between the toes.',
NULL, NULL, NULL, NULL, NULL),

('ওযু', 'Wudu (Ablution)', 11, 'ওযুর দোয়া পড়া', 'Recite Dua After Wudu',
'ওযু শেষে এই দোয়া পড়ুন।',
'Recite this dua after completing wudu.',
'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
'আশহাদু আল লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহু, ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসূলুহ',
'Ashhadu an la ilaha illallahu wahdahu la sharika lahu, wa ashhadu anna Muhammadan ''abduhu wa rasuluh',
'আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই এবং মুহাম্মদ (সা:) তাঁর বান্দা ও রাসূল',
'I bear witness that there is no deity except Allah alone, He has no partner, and Muhammad is His servant and messenger'),

-- FAJR PRAYER
('ফজর', 'Fajr', 1, 'তাকবীরে তাহরীমা', 'Takbir Tahrimah',
'কিবলামুখী হয়ে দাঁড়ান এবং "আল্লাহু আকবার" বলে হাত তুলুন। তারপর হাত বাঁধুন।',
'Stand facing Qibla and raise your hands saying "Allahu Akbar". Then fold your hands.',
'اللهُ أَكْبَرُ',
'আল্লাহু আকবার',
'Allahu Akbar',
'আল্লাহ সবচেয়ে বড়',
'Allah is the Greatest'),

('ফজর', 'Fajr', 2, 'সানা পড়া', 'Recite Sana',
'বুকে হাত বেঁধে সানা পড়ুন।',
'Fold hands on chest and recite Sana.',
'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
'সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারাকাসমুকা ওয়া তাআলা জাদ্দুকা ওয়ালা ইলাহা গাইরুক',
'Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta''ala jadduka wa la ilaha ghayruk',
'হে আল্লাহ! তুমি পবিত্র, তোমার প্রশংসা, তোমার নাম বরকতময়, তোমার মর্যাদা সুউচ্চ এবং তুমি ছাড়া কোন ইলাহ নেই',
'Glory be to You O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is no deity except You'),

('ফজর', 'Fajr', 3, 'সূরা ফাতিহা পড়া', 'Recite Surah Fatiha',
'আউযুবিল্লাহ ও বিসমিল্লাহ পড়ে সূরা ফাতিহা পড়ুন।',
'After Audhubillah and Bismillah, recite Surah Fatiha.',
'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
'আলহামদুলিল্লাহি রাব্বিল আলামীন...',
'Alhamdulillahi Rabbil-''alamin...',
'সমস্ত প্রশংসা আল্লাহর জন্য যিনি সকল জগতের রব...',
'All praise is due to Allah, Lord of all the worlds...'),

('ফজর', 'Fajr', 4, 'কিরাত পড়া', 'Recite Quranic Verses',
'সূরা ফাতিহার পর অন্য একটি সূরা বা কয়েকটি আয়াত পড়ুন।',
'After Surah Fatiha, recite another Surah or some verses.',
NULL, NULL, NULL, NULL, NULL),

('ফজর', 'Fajr', 5, 'রুকু করা', 'Perform Ruku',
'"আল্লাহু আকবার" বলে রুকুতে যান এবং তিনবার "সুবহানা রাব্বিয়াল আযীম" পড়ুন।',
'Say "Allahu Akbar" and go into Ruku, recite "Subhana Rabbiyal Azim" three times.',
'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
'সুবহানা রাব্বিয়াল আযীম',
'Subhana Rabbiyal Azim',
'আমার মহান রবের পবিত্রতা ঘোষণা করছি',
'Glory be to my Lord, the Most Great'),

('ফজর', 'Fajr', 6, 'সিজদা করা', 'Perform Sujood',
'"আল্লাহু আকবার" বলে সিজদায় যান এবং তিনবার "সুবহানা রাব্বিয়াল আলা" পড়ুন।',
'Say "Allahu Akbar" and go into Sujood, recite "Subhana Rabbiyal A''la" three times.',
'سُبْحَانَ رَبِّيَ الْأَعْلَى',
'সুবহানা রাব্বিয়াল আ''লা',
'Subhana Rabbiyal A''la',
'আমার সর্বোচ্চ রবের পবিত্রতা ঘোষণা করছি',
'Glory be to my Lord, the Most High'),

('ফজর', 'Fajr', 7, 'দ্বিতীয় রাকাত', 'Second Rakah',
'প্রথম রাকাতের মতো দ্বিতীয় রাকাত আদায় করুন তবে সানা ছাড়া।',
'Perform second rakah like the first but without Sana.',
NULL, NULL, NULL, NULL, NULL),

('ফজর', 'Fajr', 8, 'তাশাহহুদ পড়া', 'Recite Tashahhud',
'দ্বিতীয় রাকাতের দুই সিজদার পর বসে তাশাহহুদ পড়ুন।',
'After two sujood of second rakah, sit and recite Tashahhud.',
'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
'আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত তাইয়্যিবাত',
'Attahiyyatu lillahi was-salawatu wat-tayyibat',
'সকল সম্মান, নামাজ ও পবিত্রতা আল্লাহর জন্য',
'All compliments, prayers and pure words are due to Allah'),

('ফজর', 'Fajr', 9, 'দরূদ শরীফ পড়া', 'Recite Durood',
'তাশাহহুদের পর দরূদ শরীফ পড়ুন।',
'After Tashahhud, recite Durood Sharif.',
'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
'আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিও ওয়া আলা আলি মুহাম্মাদ',
'Allahumma salli ''ala Muhammadin wa ''ala ali Muhammad',
'হে আল্লাহ! মুহাম্মদ ও তাঁর বংশধরদের উপর রহমত বর্ষণ করুন',
'O Allah, send blessings upon Muhammad and his family'),

('ফজর', 'Fajr', 10, 'সালাম ফিরানো', 'Give Salam',
'ডান দিকে তারপর বাম দিকে সালাম ফিরান।',
'Give Salam to the right side, then to the left side.',
'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ',
'আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ',
'Assalamu ''alaikum wa rahmatullah',
'আপনাদের উপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক',
'Peace be upon you and Allah''s mercy');

-- Verify insertion
SELECT prayer_name_english, COUNT(*) as total_steps 
FROM namaz_steps 
GROUP BY prayer_name_english, prayer_name_bangla 
ORDER BY prayer_name_english;

SELECT COUNT(*) as total_steps FROM namaz_steps;
