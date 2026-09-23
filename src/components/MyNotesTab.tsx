import React, { useState } from 'react';
import { NoteItem } from '../data/utsavData';

interface MyNotesTabProps {
  notes: NoteItem[];
  onOpenNewNote: () => void;
  onDeleteNote: (noteId: string) => void;
  onShowToast: (msg: string) => void;
}

export const MyNotesTab: React.FC<MyNotesTabProps> = ({
  notes,
  onOpenNewNote,
  onDeleteNote,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive local state for checklist items
  const [menuItems, setMenuItems] = useState([
    { id: '1', text: '2 kg Kaju Katli + 1.5 kg Motichoor Ladoo from Bikanervala', done: false },
    { id: '2', text: 'Dinner spread: Shahi Paneer, Dal Makhani, Zafrani Pulao, stuffed Kulchas', done: false },
    { id: '3', text: 'Confirm compostable areca leaf plates (50 pax)', done: true },
  ]);

  const toggleMenuItem = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const filteredNotes = notes.filter((n) => {
    const matchesFilter = selectedFilter === 'All' || n.category === selectedFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.festivalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const remindersCount = notes.filter((n) => n.hasReminder).length;

  return (
    <div className="flex flex-col w-full px-4 pb-28 animate-fadeIn">
      {/* Subtle Header Aura & Festive Motivation */}
      <div className="relative pt-3 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#a33900] text-[20px]">auto_awesome</span>
            <span className="text-[11px] uppercase tracking-wider text-[#a33900] font-bold">
              Preparation &amp; Sankalpa
            </span>
          </div>
          <span className="text-[11px] text-[#594139] bg-[#f2e6dd] px-2 py-0.5 rounded-full font-medium">
            Karthik Month 2024
          </span>
        </div>
        <p className="text-[13px] text-[#594139]">
          Stay organized across auspicious muhurats, family feasts, and joyous gift-giving.
        </p>
      </div>

      {/* Stats Strip */}
      <div className="w-full bg-[#f8ece3] rounded-2xl p-4 shadow-xs mt-1 border border-[#f2e6dd]">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#ede0d8] flex items-center justify-center mb-1 text-[#a33900]">
              <span className="material-symbols-outlined text-[18px]">sticky_note_2</span>
            </div>
            <span className="text-[20px] text-[#201a16] font-bold leading-tight">
              {notes.length}
            </span>
            <span className="text-[11px] text-[#594139]">Total Notes</span>
          </div>

          <div className="flex flex-col items-center border-x border-[#e1bfb4]/40">
            <div className="w-8 h-8 rounded-full bg-[#ffdbce] flex items-center justify-center mb-1 text-[#a33900]">
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
            </div>
            <span className="text-[20px] text-[#a33900] font-bold leading-tight">
              {remindersCount}
            </span>
            <span className="text-[11px] text-[#594139]">Reminders</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#adeef4] flex items-center justify-center mb-1 text-[#20656b]">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
            </div>
            <span className="text-[20px] text-[#20656b] font-bold leading-tight">12</span>
            <span className="text-[11px] text-[#594139]">Tasks Done</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#594139] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search checklists, recipes, rituals..."
            className="w-full bg-[#f2e6dd] text-[#201a16] placeholder:text-[#594139]/70 text-[13px] pl-10 pr-10 py-2.5 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#ca4b07] transition-all"
          />
          <button
            type="button"
            onClick={() => onShowToast('Listening... Speak to search notes')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-[#a33900] rounded-full hover:bg-[#ede0d8]"
            aria-label="Voice Search"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>

        {/* Category Pill Filter Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['All', 'Shopping', 'Rituals', 'Guests', 'Gifts', 'Catering'].map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#a33900] text-white shadow-xs'
                    : 'bg-[#f2e6dd] text-[#594139] hover:text-[#201a16]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Festival Notes List */}
      <div className="mt-5 flex flex-col gap-6">
        {/* GROUP 1: DIWALI 2024 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#ca4b07] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">light_mode</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[17px] text-[#201a16] font-bold leading-tight">Diwali 2024</h2>
                <span className="text-[11px] text-[#594139]">Lakshmi Puja • Friday, Nov 1</span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad8] text-[#410006]">
              In 4 days
            </span>
          </div>

          {/* Note Card 1: Puja Samagri & Diyas */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#adeef4] text-[#002022]">
                    Shopping
                  </span>
                  <span className="text-[11px] text-[#594139] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">history</span> 2 hrs ago
                  </span>
                </div>
                <h3 className="text-[16px] text-[#201a16] font-bold mt-1">Puja Samagri &amp; Diyas</h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Note options')}
                className="w-7 h-7 flex items-center justify-center text-[#594139] rounded-full hover:bg-[#f2e6dd]"
                aria-label="More options"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
            <p className="text-[13px] text-[#594139] leading-relaxed">
              Procure pure brass diyas (51 count), organic rolled wicks, cow ghee, rose petals, lotus
              blooms, and marigold strings for main entryway toran.
            </p>

            {/* Task Progress Strip */}
            <div className="flex flex-col gap-1.5 bg-[#fef1e9] p-3 rounded-xl border border-[#f2e6dd]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#201a16]">5 of 6 tasks complete</span>
                <span className="text-[#20656b] font-bold">83%</span>
              </div>
              <div className="w-full h-1.5 bg-[#ede0d8] rounded-full overflow-hidden">
                <div className="bg-[#20656b] h-full rounded-full" style={{ width: '83%' }} />
              </div>
            </div>

            {/* Attached Visual Preview */}
            <div className="relative w-full h-28 rounded-xl overflow-hidden mt-1">
              <img
                className="w-full h-full object-cover"
                alt="Thali arrangement reference"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4FN55pedYGe7Rc7_btO0Wj3btQpLhAjhQqelrXHCCnUmrapGh2fg4HAk-ukNuMm__H3OdkPkZ4Gk62EfYAUEvw4hTGvqbApuuh4P_uwCly6jdBqpbaVbxzMa8-R36gEe6qG1JupFgTd3i9VW5p0Qdw5nhMZV6o9tzkWMTdyx7uJpTe6JKSgEjp_Dn66x_jtUWoXfeQagalR0-cZ9fUxhMos3z9Y7tJ3xytT2dBXMz8OC9oROP9oZA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] text-white flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  Thali arrangement reference
                </span>
              </div>
            </div>

            {/* Action Ribbon */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f8ece3]">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdbce] text-[#a33900] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">alarm</span>
                </div>
                <span className="text-[11px] font-bold text-[#a33900]">Thu, 10 AM</span>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-[#a33900]"
                  aria-label="Edit Note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Shared note with family')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-[#a33900]"
                  aria-label="Share Note"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote('note-1')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-red-600"
                  aria-label="Delete Note"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Note Card 2: Family Dinner Menu & Mithai */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#ffdbce] text-[#370e00]">
                    Catering
                  </span>
                  <span className="text-[11px] text-[#594139]">Modified Yesterday</span>
                </div>
                <h3 className="text-[16px] text-[#201a16] font-bold mt-1">
                  Family Dinner Menu &amp; Mithai
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Note options')}
                className="w-7 h-7 flex items-center justify-center text-[#594139] rounded-full hover:bg-[#f2e6dd]"
                aria-label="More options"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <ul className="flex flex-col gap-2 text-[#201a16] text-[13px] pl-1">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => toggleMenuItem(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                      item.done ? 'bg-[#8d7167]' : 'bg-[#a33900]'
                    }`}
                  />
                  <span className={item.done ? 'line-through text-[#594139] opacity-75' : ''}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action Ribbon */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f8ece3]">
              <div className="flex items-center gap-1.5 text-[#594139]">
                <button
                  type="button"
                  onClick={() => onShowToast('Reminder set for 5:00 PM')}
                  className="w-8 h-8 rounded-full bg-[#f2e6dd] flex items-center justify-center hover:text-[#a33900]"
                  aria-label="Set Reminder"
                >
                  <span className="material-symbols-outlined text-[18px]">add_alarm</span>
                </button>
                <span className="text-[11px]">No reminder set</span>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-[#a33900]"
                  aria-label="Edit Note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote('note-2')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-red-600"
                  aria-label="Delete Note"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* GROUP 2: BHAI DOOJ */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#ffdad8] text-[#b12a33] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">diversity_1</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[17px] text-[#201a16] font-bold leading-tight">Bhai Dooj</h2>
                <span className="text-[11px] text-[#594139]">
                  Auspicious Tika Muhurat • Sunday, Nov 3
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f2e6dd] text-[#594139]">
              In 6 days
            </span>
          </div>

          {/* Note Card: Gifts for Priya & Rohan */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#ffdad8] text-[#410006]">
                    Gifts
                  </span>
                  <span className="text-[11px] font-bold text-[#20656b] bg-[#adeef4] px-2 py-0.5 rounded-md">
                    ₹5,000 Budget
                  </span>
                </div>
                <h3 className="text-[16px] text-[#201a16] font-bold mt-1">
                  Gifts for Priya &amp; Rohan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Note options')}
                className="w-7 h-7 flex items-center justify-center text-[#594139] rounded-full hover:bg-[#f2e6dd]"
                aria-label="More options"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
            <p className="text-[13px] text-[#594139] leading-relaxed">
              Priya: Handcrafted silver oxidized jhumkas + roasted dry fruit hamper.
              <br />
              Rohan: Khadi silk kurta set (Size 40, peacock teal color).
            </p>

            {/* Highlighted Active Reminder Box */}
            <div className="flex items-center justify-between bg-[#ffdbce]/40 px-3 py-2 rounded-xl border border-[#ffdbce]/60">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#a33900] text-[20px]">alarm_on</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#201a16]">Reminder Scheduled</span>
                  <span className="text-[11px] text-[#a33900] font-semibold">
                    Saturday, Nov 2 • 7:00 PM
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenNewNote}
                className="text-[11px] text-[#594139] font-bold underline"
              >
                Edit
              </button>
            </div>

            {/* Action Ribbon */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f8ece3]">
              <div className="flex items-center gap-1.5 text-[#594139]">
                <span className="material-symbols-outlined text-[16px] text-[#20656b]">
                  account_balance_wallet
                </span>
                <span className="text-[11px] font-semibold">Estimated spend: ₹4,650</span>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-[#a33900]"
                  aria-label="Edit Note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote('note-3')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-red-600"
                  aria-label="Delete Note"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* GROUP 3: CHHATH PUJA */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#ede0d8] text-[#a33900] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[17px] text-[#201a16] font-bold leading-tight">Chhath Puja</h2>
                <span className="text-[11px] text-[#594139]">
                  Sandhya Arghya • Thursday, Nov 7
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f2e6dd] text-[#594139]">
              In 10 days
            </span>
          </div>

          {/* Note Card: Thekua & Bamboo Soop */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#adeef4] text-[#002022]">
                    Rituals
                  </span>
                  <span className="text-[11px] text-[#594139]">Created 3 days ago</span>
                </div>
                <h3 className="text-[16px] text-[#201a16] font-bold mt-1">
                  Thekua Prep &amp; Bamboo Soop
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Note options')}
                className="w-7 h-7 flex items-center justify-center text-[#594139] rounded-full hover:bg-[#f2e6dd]"
                aria-label="More options"
              >
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
            <p className="text-[13px] text-[#594139] leading-relaxed whitespace-pre-line">
              1. Procure traditional handwoven bamboo soop (4 pieces) and clay stoves.
              2. Stone-ground whole wheat flour and organic sugarcane jaggery stock check.
              3. Arrange fresh seasonal produce: Daabh nimbu, raw turmeric rhizomes, ginger plants,
              water chestnuts (singhara).
            </p>

            {/* Mini Visual Hint */}
            <div className="relative w-full h-24 rounded-xl overflow-hidden mt-1">
              <img
                className="w-full h-full object-cover"
                alt="Chhath Puja Soop and offerings"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADjhWEtetfwKfSsePkWxMG5MC8nthsvwYZ46OixJ0tqbZsHObVMP6at2zhxdoAW57JSYnw87zSwzawxX_XLFQGknQFhlSILaZZzSB8-emo1rW7tHbf1IPO6iv-hNDAib6Ih_nuk4vGGyri45Rc2V4T0dBxscVHpw7OFkWbljwbUhH-nttERRRp9qyYTjxCQEF1dFkUeOhzM0FKb-_KUDCFuqF4dC_iyS43fuMk0qZRhUfgSqWNUO-0"
              />
            </div>

            {/* Action Ribbon */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f8ece3]">
              <div className="flex items-center gap-1.5 text-[#594139]">
                <button
                  type="button"
                  onClick={() => onShowToast('Alert set for Nov 5')}
                  className="w-8 h-8 rounded-full bg-[#f2e6dd] flex items-center justify-center hover:text-[#a33900]"
                  aria-label="Add Reminder"
                >
                  <span className="material-symbols-outlined text-[18px]">add_alarm</span>
                </button>
                <span className="text-[11px] font-medium">Nov 5 prep alert</span>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-[#a33900]"
                  aria-label="Edit Note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote('note-4')}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f2e6dd] hover:text-red-600"
                  aria-label="Delete Note"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Quote Footer Card */}
        <div className="w-full bg-[#fef1e9] rounded-2xl p-4 flex items-center gap-3 shadow-xs border border-[#f2e6dd]">
          <div className="w-10 h-10 rounded-full bg-[#ffdbce] flex items-center justify-center text-[#a33900] shrink-0">
            <span className="material-symbols-outlined text-[22px]">spa</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#201a16]">Joy is in the Preparation</span>
            <span className="text-[11px] text-[#594139]">
              Shared lists notify family members instantly via WhatsApp.
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          type="button"
          onClick={onOpenNewNote}
          className="flex items-center gap-2 bg-gradient-to-r from-[#a33900] to-[#ca4b07] text-white px-5 py-3.5 rounded-full shadow-[0_8px_24px_rgba(224,90,27,0.35)] active:scale-95 transition-all font-bold text-[13px]"
        >
          <span className="material-symbols-outlined text-[22px] font-bold">add</span>
          <span>New Note</span>
        </button>
      </div>
    </div>
  );
};
