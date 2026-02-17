-- Noor e Ramadan - Mosques Seed Data
-- Famous Bangladesh Mosques with GPS coordinates
-- Execute this in Supabase SQL Editor after running schema.sql

INSERT INTO mosques (
  name_bangla,
  name_english,
  address_bangla,
  address_english,
  city,
  city_bangla,
  area_bangla,
  area_english,
  latitude,
  longitude,
  phone,
  website,
  iftar_time,
  taraweeh_time,
  facilities,
  description_bangla,
  description_english,
  verified
) VALUES

('বায়তুল মোকাররম জাতীয় মসজিদ', 'Baitul Mukarram National Mosque', 'পল্টন, ঢাকা', 'Paltan, Dhaka', 'Dhaka', 'ঢাকা', 'পল্টন', 'Paltan',
23.734148, 90.407274, '+880-2-9560652', 'https://islamicfoundation.gov.bd',
'18:00', '20:30',
'{"parking": true, "ac": true, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": true, "library": true}',
'বাংলাদেশের জাতীয় মসজিদ। ১৯৬৮ সালে নির্মাণ সম্পন্ন হয়। একসাথে ৪০,০০০ মুসল্লি নামাজ আদায় করতে পারেন। কাবা শরীফের আদলে নির্মিত।',
'National Mosque of Bangladesh. Completed in 1968. Can accommodate 40,000 worshippers. Built in the style of Kaaba.',
true),

('তারা মসজিদ', 'Star Mosque (Tara Masjid)', 'আরমানিটোলা, ঢাকা', 'Armanitola, Dhaka', 'Dhaka', 'ঢাকা', 'আরমানিটোলা', 'Armanitola',
23.718889, 90.422222, '+880-1700-000000', NULL,
'18:00', '20:30',
'{"parking": false, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'১৮শ শতাব্দীতে নির্মিত। মুঘল স্থাপত্যের অনন্য নিদর্শন। দেয়ালে নীল তারকা চিহ্নিত মোজাইক রয়েছে। সংস্কারকাজ ১৯৩০ সালে সম্পন্ন।',
'Built in 18th century. Unique example of Mughal architecture. Features blue star motif mosaics on walls. Renovated in 1930.',
true),

('ষাট গম্বুজ মসজিদ', 'Sixty Dome Mosque (Shat Gombuj Masjid)', 'বাগেরহাট', 'Bagerhat', 'Bagerhat', 'বাগেরহাট', 'বাগেরহাট সদর', 'Bagerhat Sadar',
22.685394, 89.835278, '+880-1800-000000', NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true, "unesco_site": true}',
'১৫ শতকে খান জাহান আলী (রহ:) কর্তৃক নির্মিত। ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান। প্রকৃতপক্ষে ৭৭টি গম্বুজ রয়েছে। বাংলাদেশের সবচেয়ে বড় মসজিদ ছিল।',
'Built in 15th century by Khan Jahan Ali (RA). UNESCO World Heritage Site. Actually has 77 domes. Was the largest mosque in Bangladesh.',
true),

('চকবাজার শাহী মসজিদ', 'Chawk Mosque', 'চকবাজার, ঢাকা', 'Chawkbazar, Dhaka', 'Dhaka', 'ঢাকা', 'চকবাজার', 'Chawkbazar',
23.718611, 90.409722, '+880-2-7310001', NULL,
'18:00', '20:30',
'{"parking": false, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'মুঘল আমলে ১৬৭৬ সালে শায়েস্তা খান কর্তৃক নির্মিত। তিনটি গম্বুজ ও দুটি মিনার সহ মুঘল স্থাপত্যের নিদর্শন। পুরান ঢাকার ঐতিহ্যবাহী মসজিদ।',
'Built in 1676 by Shaista Khan during Mughal period. Features three domes and two minarets in Mughal architecture. Historic mosque of Old Dhaka.',
true),

('আতিয়া জামে মসজিদ', 'Atia Mosque', 'টাঙ্গাইল', 'Tangail', 'Tangail', 'টাঙ্গাইল', 'টাঙ্গাইল সদর', 'Tangail Sadar',
24.250278, 89.917778, '+880-1900-000000', NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'১৬০৮ সালে সৈয়দ মাহমুদ পাশা কর্তৃক নির্মিত। চারটি খিলান এবং চারটি মিনার রয়েছে। মুঘল স্থাপত্যের অপূর্ব নিদর্শন।',
'Built in 1608 by Syed Mahmud Pasha. Features four arches and four minarets. Exquisite example of Mughal architecture.',
true),

('কুসুম্বা মসজিদ', 'Kusumba Mosque', 'নাওগাঁ', 'Naogaon', 'Naogaon', 'নাওগাঁ', 'মান্দা', 'Manda',
24.883333, 88.933333, NULL, NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'১৫৫৮ সালে সুলতানি আমলে নির্মিত। ছয়টি গম্বুজ বিশিষ্ট। পোড়ামাটির চমৎকার কারুকাজ রয়েছে। উত্তরবঙ্গের গুরুত্বপূর্ণ ঐতিহাসিক মসজিদ।',
'Built in 1558 during Sultanate period. Features six domes. Contains beautiful terracotta work. Important historical mosque of North Bengal.',
true),

('বিনত বিবির মসজিদ', 'Binat Bibi Mosque', 'শের-ই-বাংলা নগর, ঢাকা', 'Sher-e-Bangla Nagar, Dhaka', 'Dhaka', 'ঢাকা', 'শের-ই-বাংলা নগর', 'Sher-e-Bangla Nagar',
23.762778, 90.376944, NULL, NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'মুঘল আমলে নির্মিত। তিনটি গম্বুজ বিশিষ্ট ছোট কিন্তু সুন্দর মসজিদ। স্থানীয়ভাবে খুবই সম্মানিত।',
'Built during Mughal era. Small but beautiful mosque featuring three domes. Highly respected locally.',
true),

('কান্দালা পীরের মসজিদ', 'Kandala Peer''s Mosque', 'চট্টগ্রাম', 'Chittagong', 'Chattogram', 'চট্টগ্রাম', 'কান্দিরপাড়', 'Khandirpar',
22.356806, 91.783333, '+880-1500-000000', NULL,
'18:00', '20:30',
'{"parking": true, "ac": true, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": true}',
'চট্টগ্রামের বৃহত্তম মসজিদগুলোর একটি। আধুনিক সুবিধা সহ প্রশস্ত মসজিদ। প্রতি শুক্রবার হাজার হাজার মুসল্লির সমাগম হয়।',
'One of the largest mosques in Chittagong. Spacious mosque with modern facilities. Thousands of worshippers gather every Friday.',
true),

('আজাদ মসজিদ', 'Azad Mosque', 'কোতোয়ালি, ঢাকা', 'Kotwali, Dhaka', 'Dhaka', 'ঢাকা', 'নবাবপুর', 'Nawabpur',
23.720833, 90.407778, '+880-2-7315001', NULL,
'18:00', '20:30',
'{"parking": false, "ac": true, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false}',
'পুরান ঢাকার প্রাণকেন্দ্রে অবস্থিত। ঐতিহ্যবাহী মসজিদ যেখানে নিয়মিত ধর্মীয় শিক্ষা দেওয়া হয়।',
'Located in the heart of Old Dhaka. Traditional mosque where religious education is regularly provided.',
true),

('আন্দরকিল্লা শাহী জামে মসজিদ', 'Anderkilla Shahi Jame Mosque', 'চট্টগ্রাম', 'Chittagong', 'Chattogram', 'চট্টগ্রাম', 'আন্দরকিল্লা', 'Anderkilla',
22.328611, 91.827222, '+880-31-610212', NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'১৬৬৭ সালে মুঘল আমলে নির্মিত। চট্টগ্রামের প্রাচীনতম মসজিদগুলোর একটি। মুঘল স্থাপত্যের সুন্দর নমুনা।',
'Built in 1667 during Mughal period. One of the oldest mosques in Chittagong. Beautiful example of Mughal architecture.',
true),

('কাজী অফিস লেন মসজিদ', 'Kazi Office Lane Mosque', 'গুলশান, ঢাকা', 'Gulshan, Dhaka', 'Dhaka', 'ঢাকা', 'গুলশান-২', 'Gulshan-2',
23.791111, 90.415278, '+880-2-8826611', NULL,
'18:00', '20:30',
'{"parking": true, "ac": true, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": true, "modern": true}',
'আধুনিক স্থাপত্যে নির্মিত মসজিদ। এয়ার কন্ডিশন সুবিধা সহ প্রশস্ত নামাজের স্থান। গুলশান এলাকার প্রধান মসজিদ।',
'Mosque built with modern architecture. Spacious prayer area with air conditioning facility. Main mosque of Gulshan area.',
true),

('বাইয়্যাজীদ বোস্তামী মসজিদ', 'Bayazid Bostami Mosque', 'চট্টগ্রাম', 'Chittagong', 'Chattogram', 'চট্টগ্রাম', 'নাসিরাবাদ', 'Nasirabad',
22.341944, 91.818056, '+880-31-617001', NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": true, "shrine": true}',
'বিখ্যাত সুফী দরবেশ হযরত বায়েজীদ বোস্তামী (রহ:) এর মাজারের সাথে সংযুক্ত। পবিত্র স্থান হিসেবে পরিচিত। প্রতিদিন হাজার হাজার মানুষ দর্শন করে।',
'Connected to the shrine of famous Sufi dервиش Hazrat Bayazid Bostami (RA). Known as a holy place. Thousands visit daily.',
true),

('গুটিয়া মসজিদ', 'Gutia Mosque', 'কুমিল্লা', 'Cumilla', 'Cumilla', 'কুমিল্লা', 'লাকসাম', 'Laksam',
23.233333, 90.816667, NULL, NULL,
'18:00', '20:30',
'{"parking": true, "ac": false, "wudu_area": true, "ladies_prayer": true, "wheelchair_accessible": false, "historical": true}',
'সুলতানি আমলে নির্মিত ঐতিহাসিক মসজিদ। স্থানীয় স্থাপত্যের অনন্য নিদর্শন। পূর্ববঙ্গের গুরুত্বপূর্ণ ঐতিহ্যবাহী মসজিদ।',
'Historic mosque built during Sultanate period. Unique specimen of local architecture. Important traditional mosque of East Bengal.',
true);

-- Verify insertion
SELECT city, COUNT(*) as mosque_count 
FROM mosques 
GROUP BY city 
ORDER BY mosque_count DESC;

SELECT COUNT(*) as total_mosques FROM mosques;
