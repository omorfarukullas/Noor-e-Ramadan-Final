export interface IslamicOccasion {
    id: string;
    name: string;
    hijriMonth: number;
    hijriDay: number;
    description: string;
    ibadah: string;
    priority: 'high' | 'medium' | 'low';
}

export const ISLAMIC_OCCASIONS: IslamicOccasion[] = [
    {
        id: 'new_year',
        name: 'ইসলামিক নববর্ষ',
        hijriMonth: 1, // Muharram
        hijriDay: 1,
        description: 'হিজরি সনের প্রথম দিন।',
        ibadah: 'নফল রোজা, দান খয়রাত।',
        priority: 'medium'
    },
    {
        id: 'ashura',
        name: 'আশুরা',
        hijriMonth: 1,
        hijriDay: 10,
        description: 'কারবালার বিয়োগান্তক ঘটনা এবং মুসা (আঃ) এর নাজাত দিবস।',
        ibadah: 'রোজা রাখা (৯-১০ অথবা ১০-১১), বিশেষ নফল নামাজ।',
        priority: 'high'
    },
    {
        id: 'eid_milad',
        name: 'ঈদে মিলাদুন্নবী ﷺ',
        hijriMonth: 3, // Rabi al-Awwal
        hijriDay: 12,
        description: 'সর্বশেষ নবী হযরত মুহাম্মদ ﷺ এর জন্ম ও ওফাত দিবস।',
        ibadah: 'দুরুদ শরীফ পাঠ, সিরাত আলোচনা, নফল ইবাদত।',
        priority: 'high'
    },
    {
        id: 'shabe_meraj',
        name: 'শবে মেরাজ',
        hijriMonth: 7, // Rajab
        hijriDay: 27,
        description: 'নবীজী ﷺ এর উর্ধ্বগমন ও পাঁচ ওয়াক্ত নামাজ ফরজ হওয়ার রাত।',
        ibadah: 'নফল নামাজ, জিকির, কুরআন তিলাওয়াত।',
        priority: 'high'
    },
    {
        id: 'shabe_barat',
        name: 'শবে বরাত',
        hijriMonth: 8, // Shaban
        hijriDay: 15,
        description: 'ভাগ্য রজনী এবং আল্লাহ তায়ালার বিশেষ অনুগ্রহ প্রাপ্তির রাত।',
        ibadah: 'নফল রোজা, কবর জিয়ারত, তাওবা ইস্তেগফার।',
        priority: 'high'
    },
    {
        id: 'ramadan_start',
        name: 'রমজান শুরু',
        hijriMonth: 9, // Ramadan
        hijriDay: 1,
        description: 'পবিত্র রমজান মাসের শুরু।',
        ibadah: 'রোজা রাখা, তারাবি নামাজ, কুরআন খতম।',
        priority: 'high'
    },
    {
        id: 'shabe_qadr',
        name: 'শবে কদর',
        hijriMonth: 9,
        hijriDay: 27, // Traditionally 27th, typically odd nights of last 10 days
        description: 'হাজার মাসের চেয়ে উত্তম একটি রাত। কুরআন নাযিলের রাত।',
        ibadah: 'সারারাত ইবাদত, ক্ষমা প্রার্থনা।',
        priority: 'high'
    },
    {
        id: 'eid_fitr',
        name: 'ঈদুল ফিতর',
        hijriMonth: 10, // Shawwal
        hijriDay: 1,
        description: 'দীর্ঘ এক মাস রোজা রাখার পর মুসলিম উম্মাহর আনন্দের দিন।',
        ibadah: 'ঈদের নামাজ, সদকাতুল ফিতর আদায়, আনন্দ ভাগাভাগি।',
        priority: 'high'
    },
    {
        id: 'hajj_start',
        name: 'হজ শুরু',
        hijriMonth: 12, // Dhu al-Hijjah
        hijriDay: 8,
        description: 'হজের আনুষ্ঠানিকতা শুরু।',
        ibadah: 'হাজী সাহেবদের জন্য ইহরাম বাঁধা। অন্যদের জন্য নফল রোজা।',
        priority: 'high'
    },
    {
        id: 'arafah',
        name: 'আরাফাহর দিন',
        hijriMonth: 12,
        hijriDay: 9,
        description: 'হজের অন্যতম প্রধান রুকন। দোয়া কবুলের দিন।',
        ibadah: 'আরাফাহর রোজা রাখা (গত এক বছর ও আগামী এক বছরের গুনাহ মাফ হয়)।',
        priority: 'high'
    },
    {
        id: 'eid_adha',
        name: 'ঈদুল আযহা',
        hijriMonth: 12,
        hijriDay: 10,
        description: 'কুরবানির ঈদ।',
        ibadah: 'ঈদের নামাজ, পশু কুরবানি।',
        priority: 'high'
    }
];

export const HIJRI_MONTHS_BANGLA = [
    { number: 1, ar: 'Muḥarram', bn: 'মুহাররম', desc: 'হারাম মাস, আশুরা' },
    { number: 2, ar: 'Ṣafar', bn: 'সফর', desc: 'শূন্য, রিক্ত' },
    { number: 3, ar: 'Rabīʿ al-Awwal', bn: 'রবিউল আউয়াল', desc: 'প্রথম বসন্ত, নবীজীর জন্ম' },
    { number: 4, ar: 'Rabīʿ al-Thānī', bn: 'রবিউল সানি', desc: 'দ্বিতীয় বসন্ত' },
    { number: 5, ar: 'Jumādā al-Ūlā', bn: 'জুমাদিউল আউয়াল', desc: 'প্রথম শুষ্ক ভূমি' },
    { number: 6, ar: 'Jumādā al-Thāniyah', bn: 'জুমাদিউল সানি', desc: 'দ্বিতীয় শুষ্ক ভূমি' },
    { number: 7, ar: 'Rajab', bn: 'রজব', desc: 'সম্মানিত, শবে মেরাজ' },
    { number: 8, ar: 'Shaʿbān', bn: 'শাবান', desc: 'বিক্ষিপ্ত, শবে বরাত' },
    { number: 9, ar: 'Ramaḍān', bn: 'রমজান', desc: 'দহন, সিয়াম সাধনা' },
    { number: 10, ar: 'Shawwāl', bn: 'শাওয়াল', desc: 'উত্তোলন, ঈদুল ফিতর' },
    { number: 11, ar: 'Dhū al-Qaʿdah', bn: 'জিলকদ', desc: 'বসে থাকা, যুদ্ধবিরতি' },
    { number: 12, ar: 'Dhū al-Ḥijjah', bn: 'জিলহজ', desc: 'হজ, কুরবানি' },
];

export const BANGLA_WEEKDAYS = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
export const FULL_BANGLA_WEEKDAYS = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
