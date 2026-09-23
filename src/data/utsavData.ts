export interface Festival {
  id: string;
  name: string;
  hindiName?: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  month: string;
  day: string;
  tithi: string;
  countdown: string;
  description: string;
  region: string;
  muhuratTime: string;
  muhuratWindow?: string;
  category: 'major' | 'vrat' | 'regional' | 'jayanti';
  notesCount: number;
  notes?: string[];
  isSpotlight?: boolean;
  heroImage?: string;
}

export interface NoteItem {
  id: string;
  festivalId: string;
  festivalName: string;
  title: string;
  category: 'Shopping' | 'Rituals' | 'Guests' | 'Gifts' | 'Catering';
  timeAgo: string;
  description: string;
  budget?: string;
  estimatedSpend?: string;
  reminder?: string;
  hasReminder: boolean;
  completedTasks?: number;
  totalTasks?: number;
  checklist?: { id: string; text: string; completed: boolean }[];
  imageUrl?: string;
  imageCaption?: string;
  tags?: string[];
}

export const INITIAL_FESTIVALS: Festival[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    hindiName: 'दीपावली',
    date: '2024-11-01',
    displayDate: 'Friday, Nov 1, 2024',
    month: 'NOV',
    day: '01',
    tithi: 'Kartik Krishna Amavasya',
    countdown: 'In 4 Days',
    description: 'The Festival of Lights & Lakshmi Pujan',
    region: 'Mahaparv • Pan-India',
    muhuratTime: '05:36 PM – 07:32 PM',
    muhuratWindow: 'Pradosh Kaal',
    category: 'major',
    notesCount: 2,
    isSpotlight: true,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9HUN8I0smoZt23bz-NeyjKkYGPPO2xkthwGyJUK4JId9xJMYBc3MWlZ12-k5ufd82VU46xZwyr2nZXS_jJI73b91qobWYXtISbWiesWUIFQu5SbiZjMDFcD0fSX7Y1UAxxCguGWV9H3WHCPslhEXw9xf6PuhMYAEHFNCnQMQCb-4XnDTHpFmBcMjsEzjyQvIQuz6-jMsY27VmYZ927cUy0ZuwJNfla7Nd0qG3MafqLIome1GmCh7_',
  },
  {
    id: 'govardhan',
    name: 'Govardhan Puja & Annakut',
    hindiName: 'गोवर्धन पूजा',
    date: '2024-11-02',
    displayDate: 'Saturday, Nov 2, 2024',
    month: 'NOV',
    day: '02',
    tithi: 'Pratipada Tithi',
    countdown: 'In 5 Days',
    description: 'Celebrating Krishna lifting Govardhan Hill & Chhappan Bhog',
    region: 'North & West India',
    muhuratTime: '03:22 PM',
    category: 'major',
    notesCount: 1,
    notes: ['Prepare 56 food offerings list with temple committee before Saturday morning.'],
  },
  {
    id: 'bhaidooj',
    name: 'Bhai Dooj (Yama Dwitiya)',
    hindiName: 'भाई दूज',
    date: '2024-11-03',
    displayDate: 'Sunday, Nov 3, 2024',
    month: 'NOV',
    day: '03',
    tithi: 'Dwitiya Tithi',
    countdown: 'In 6 Days',
    description: 'Sacred sibling bond celebration & auspicious tilak muhurat',
    region: 'Pan-India',
    muhuratTime: 'Aparahna 01:10 PM',
    category: 'major',
    notesCount: 1,
  },
  {
    id: 'chhath',
    name: 'Chhath Puja (Sandhya Arghya)',
    hindiName: 'छठ पूजा',
    date: '2024-11-07',
    displayDate: 'Thursday, Nov 7, 2024',
    month: 'NOV',
    day: '07',
    tithi: 'Shashti Tithi',
    countdown: 'In 10 Days',
    description: 'Solemn solar deity worship, Thekua prasad, and holy river rituals',
    region: 'Bihar, UP & Global',
    muhuratTime: 'Sunset Arghya 05:32 PM',
    category: 'vrat',
    notesCount: 3,
    notes: [
      'Clay stove and dry mango wood arranged for Thekua',
      'Fresh bamboo baskets (Soop) procured from market',
      'Ghat reservation timing: Arrive by 4:00 PM Thursday',
    ],
  },
  {
    id: 'devdeepawali',
    name: 'Dev Deepawali',
    hindiName: 'देव दीपावली',
    date: '2024-11-15',
    displayDate: 'Friday, Nov 15, 2024',
    month: 'NOV',
    day: '15',
    tithi: 'Kartik Purnima',
    countdown: 'In 18 Days',
    description: 'Varanasi Ghats lit with million earthen lamps for the Gods',
    region: 'Varanasi, UP',
    muhuratTime: 'Pradosh 05:10 PM',
    category: 'regional',
    notesCount: 0,
  },
  {
    id: 'sankranti',
    name: 'Makar Sankranti & Pongal',
    hindiName: 'मकर संक्रांति',
    date: '2025-01-14',
    displayDate: 'Tuesday, Jan 14, 2025',
    month: 'JAN',
    day: '14',
    tithi: 'Uttarayan Transit',
    countdown: 'Jan 2025',
    description: 'Harvest festival, kite flying, sesame til-gul, & Surya Vandana',
    region: 'Pan-India & Diaspora',
    muhuratTime: 'Punya Kaal 07:15 AM',
    category: 'major',
    notesCount: 0,
  },
  {
    id: 'shivratri',
    name: 'Maha Shivratri',
    hindiName: 'महाशिवरात्रि',
    date: '2025-02-26',
    displayDate: 'Wednesday, Feb 26, 2025',
    month: 'FEB',
    day: '26',
    tithi: 'Chaturdashi Tithi',
    countdown: 'Feb 2025',
    description: 'Great night of Lord Shiva with Nishita Kaal Puja & Belpatra abhishekam',
    region: 'Pan-India',
    muhuratTime: '11:45 PM – 12:35 AM',
    category: 'vrat',
    notesCount: 0,
  },
  {
    id: 'holi',
    name: 'Holi (Holika Dahan & Dhulandi)',
    hindiName: 'होली',
    date: '2025-03-14',
    displayDate: 'Friday, Mar 14, 2025',
    month: 'MAR',
    day: '14',
    tithi: 'Phalguna Purnima',
    countdown: 'Mar 2025',
    description: 'Vibrant festival of colors, spring rejuvenation, Gujiya feast',
    region: 'Pan-India & Global',
    muhuratTime: 'Holika Dahan 06:28 PM',
    category: 'major',
    notesCount: 0,
  },
  {
    id: 'ramnavami',
    name: 'Ram Navami',
    hindiName: 'राम नवमी',
    date: '2025-04-06',
    displayDate: 'Sunday, Apr 6, 2025',
    month: 'APR',
    day: '06',
    tithi: 'Chaitra Shukla Navami',
    countdown: 'Apr 2025',
    description: 'Celebration of Maryada Purushottam Shri Ram Janmotsav at noon',
    region: 'Pan-India',
    muhuratTime: 'Madhyahna 11:05 AM',
    category: 'jayanti',
    notesCount: 0,
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    festivalId: 'diwali',
    festivalName: 'Diwali 2024',
    title: 'Puja Samagri & Diyas',
    category: 'Shopping',
    timeAgo: '2 hrs ago',
    description: 'Procure pure brass diyas (51 count), organic rolled wicks, cow ghee, rose petals, lotus blooms, and marigold strings for main entryway toran.',
    completedTasks: 5,
    totalTasks: 6,
    hasReminder: true,
    reminder: 'Thu, 10 AM',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4FN55pedYGe7Rc7_btO0Wj3btQpLhAjhQqelrXHCCnUmrapGh2fg4HAk-ukNuMm__H3OdkPkZ4Gk62EfYAUEvw4hTGvqbApuuh4P_uwCly6jdBqpbaVbxzMa8-R36gEe6qG1JupFgTd3i9VW5p0Qdw5nhMZV6o9tzkWMTdyx7uJpTe6JKSgEjp_Dn66x_jtUWoXfeQagalR0-cZ9fUxhMos3z9Y7tJ3xytT2dBXMz8OC9oROP9oZA',
    imageCaption: 'Thali arrangement reference',
    tags: ['Puja Items', 'Decor'],
  },
  {
    id: 'note-2',
    festivalId: 'diwali',
    festivalName: 'Diwali 2024',
    title: 'Family Dinner Menu & Mithai',
    category: 'Catering',
    timeAgo: 'Modified Yesterday',
    description: '2 kg Kaju Katli + 1.5 kg Motichoor Ladoo from Bikanervala. Dinner spread: Shahi Paneer, Dal Makhani, Zafrani Pulao, stuffed Kulchas. Confirm compostable areca leaf plates (50 pax).',
    completedTasks: 1,
    totalTasks: 3,
    hasReminder: false,
    checklist: [
      { id: 'c1', text: '2 kg Kaju Katli + 1.5 kg Motichoor Ladoo from Bikanervala', completed: true },
      { id: 'c2', text: 'Dinner spread: Shahi Paneer, Dal Makhani, Zafrani Pulao, stuffed Kulchas', completed: true },
      { id: 'c3', text: 'Confirm compostable areca leaf plates (50 pax)', completed: false },
    ],
  },
  {
    id: 'note-3',
    festivalId: 'bhaidooj',
    festivalName: 'Bhai Dooj',
    title: 'Gifts for Priya & Rohan',
    category: 'Gifts',
    timeAgo: 'Yesterday',
    description: 'Priya: Handcrafted silver oxidized jhumkas + roasted dry fruit hamper. Rohan: Khadi silk kurta set (Size 40, peacock teal color).',
    budget: '₹5,000 Budget',
    estimatedSpend: 'Estimated spend: ₹4,650',
    hasReminder: true,
    reminder: 'Saturday, Nov 2 • 7:00 PM',
    tags: ['Family', 'Courier'],
  },
  {
    id: 'note-4',
    festivalId: 'chhath',
    festivalName: 'Chhath Puja',
    title: 'Thekua Prep & Bamboo Soop',
    category: 'Rituals',
    timeAgo: 'Created 3 days ago',
    description: '1. Procure traditional handwoven bamboo soop (4 pieces) and clay stoves.\n2. Stone-ground whole wheat flour and organic sugarcane jaggery stock check.\n3. Arrange fresh seasonal produce: Daabh nimbu, raw turmeric rhizomes, ginger plants, water chestnuts (singhara).',
    hasReminder: true,
    reminder: 'Nov 5 prep alert',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADjhWEtetfwKfSsePkWxMG5MC8nthsvwYZ46OixJ0tqbZsHObVMP6at2zhxdoAW57JSYnw87zSwzawxX_XLFQGknQFhlSILaZZzSB8-emo1rW7tHbf1IPO6iv-hNDAib6Ih_nuk4vGGyri45Rc2V4T0dBxscVHpw7OFkWbljwbUhH-nttERRRp9qyYTjxCQEF1dFkUeOhzM0FKb-_KUDCFuqF4dC_iyS43fuMk0qZRhUfgSqWNUO-0',
  },
];
