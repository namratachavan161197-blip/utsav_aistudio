import React, { useState } from 'react';
import { Festival, NoteItem } from '../data/utsavData';

interface FestivalsTabProps {
  festivals: Festival[];
  notes: NoteItem[];
  onSelectFestival: (festivalId: string) => void;
  onAddQuickNote: (festivalName: string, noteText: string) => void;
  onShowToast: (msg: string) => void;
}

export const FestivalsTab: React.FC<FestivalsTabProps> = ({
  festivals,
  notes,
  onSelectFestival,
  onAddQuickNote,
  onShowToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSort, setActiveSort] = useState<'soonest' | 'month' | 'alpha'>('soonest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDiwaliNoteDrawer, setShowDiwaliNoteDrawer] = useState<boolean>(false);
  const [diwaliNoteInput, setDiwaliNoteInput] = useState<string>('');
  const [expandedNotesCard, setExpandedNotesCard] = useState<string | null>(null);

  // Quick category counts
  const totalCount = festivals.length;

  // Filtered festivals
  const filtered = festivals.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tithi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sorted festivals
  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === 'alpha') {
      return a.name.localeCompare(b.name);
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const spotlight = festivals.find((f) => f.id === 'diwali') || festivals[0];

  const handleSaveDiwaliNote = () => {
    if (!diwaliNoteInput.trim()) {
      onShowToast('Please enter a note first');
      return;
    }
    onAddQuickNote('Diwali', diwaliNoteInput.trim());
    setDiwaliNoteInput('');
    setShowDiwaliNoteDrawer(false);
    onShowToast('Saved note for Diwali!');
  };

  const handleQuickAddPrompt = (fest: Festival) => {
    const note = prompt(`Add a personal note or preparation task for ${fest.name}:`, '');
    if (note && note.trim()) {
      onAddQuickNote(fest.name, note.trim());
      onShowToast(`Added note for ${fest.name}`);
    }
  };

  const toggleExpandNote = (festId: string) => {
    setExpandedNotesCard(expandedNotesCard === festId ? null : festId);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Sticky Search & Filter Canopy */}
      <section className="sticky top-16 z-30 bg-[#fff8f5]/95 backdrop-blur-md shadow-xs transition-all border-b border-[#f2e6dd]">
        <div className="px-4 pt-2.5 pb-2 flex flex-col gap-2">
          {/* Search Input Box */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#a33900]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search festivals, tithi, muhurat..."
              className="w-full h-11 pl-10 pr-11 rounded-xl bg-[#f2e6dd] text-[#201a16] placeholder:text-[#594139]/70 text-[14px] focus:outline-none focus:bg-[#ffffff] focus:ring-1 focus:ring-[#ca4b07] focus:shadow-sm transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#594139] hover:text-[#a33900]"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onShowToast('Listening... Speak festival name')}
                className="absolute right-1.5 w-8 h-8 rounded-lg flex items-center justify-center text-[#594139] hover:text-[#a33900] active:scale-95 transition-transform"
                aria-label="Voice Search"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            )}
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: `All (${totalCount})` },
              { id: 'major', label: '✨ Major' },
              { id: 'vrat', label: '🕊️ Vrat & Fasting' },
              { id: 'regional', label: '🌺 Regional' },
              { id: 'jayanti', label: '🪔 Jayanti' },
            ].map((chip) => {
              const isSelected = activeCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setActiveCategory(chip.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#a33900] text-white shadow-xs'
                      : 'bg-[#f2e6dd] text-[#594139] hover:bg-[#ede0d8] active:scale-95'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Sorting Toolbar with Active Underbar */}
        <div className="px-4 py-2 flex items-center justify-between bg-[#fef1e9]/80 border-t border-[#f2e6dd]/60">
          <div className="flex items-center gap-1.5 text-[#594139]">
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sort by</span>
          </div>
          <div className="inline-flex rounded-lg p-0.5 bg-[#f2e6dd]">
            <button
              type="button"
              onClick={() => setActiveSort('soonest')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeSort === 'soonest'
                  ? 'bg-white text-[#a33900] shadow-xs'
                  : 'text-[#594139] hover:text-[#201a16]'
              }`}
            >
              Soonest First
            </button>
            <button
              type="button"
              onClick={() => setActiveSort('month')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeSort === 'month'
                  ? 'bg-white text-[#a33900] shadow-xs'
                  : 'text-[#594139] hover:text-[#201a16]'
              }`}
            >
              By Month
            </button>
            <button
              type="button"
              onClick={() => setActiveSort('alpha')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeSort === 'alpha'
                  ? 'bg-white text-[#a33900] shadow-xs'
                  : 'text-[#594139] hover:text-[#201a16]'
              }`}
            >
              A-Z
            </button>
          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="px-4 mt-4 flex flex-col gap-6">
        {/* Hero Festive Spotlight Card: Diwali */}
        <article className="relative w-full rounded-2xl overflow-hidden bg-[#362f2a] text-[#fbeee6] shadow-xl flex flex-col justify-between">
          {/* Background Visual with Ambient Scrim */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-700 hover:scale-100"
            style={{
              backgroundImage: `url('${spotlight.heroImage}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#362f2a] via-[#362f2a]/80 to-transparent" />

          {/* Top Header Row */}
          <div className="relative z-10 p-4 flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-[#ca4b07]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[15px] animate-pulse">local_fire_department</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider">In 4 Days</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              <span className="text-[11px]">{spotlight.displayDate}</span>
            </div>
          </div>

          {/* Mid Content: Auspicious Title & Details */}
          <div className="relative z-10 px-4 pt-4 pb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fd6264] animate-ping" />
              <span className="text-[11px] uppercase tracking-widest text-[#ffdbce] font-semibold">
                Mahaparv • Pan-India
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[24px] text-white font-bold tracking-tight flex items-center gap-2">
                Diwali
                <span className="material-symbols-outlined text-[#ffb599] text-[26px]">flare</span>
              </h2>
              <p className="text-[14px] text-[#ede0d8]/90 leading-snug">
                The Festival of Lights &amp; Lakshmi Pujan
              </p>
            </div>

            {/* Shubh Muhurat Banner Inside Spotlight */}
            <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 mt-1 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ca4b07]/80 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#ffdbce] uppercase tracking-wider font-semibold">
                    Shubh Muhurat
                  </span>
                  <span className="text-[17px] font-bold text-white leading-none mt-0.5">
                    {spotlight.muhuratTime}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#ede0d8] bg-white/10 px-2 py-0.5 rounded">
                {spotlight.muhuratWindow || 'Pradosh Kaal'}
              </span>
            </div>

            {/* Action Bar: Add Note & Open Guide */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowDiwaliNoteDrawer(!showDiwaliNoteDrawer)}
                className="flex-1 h-10 px-3 rounded-xl bg-white text-[#362f2a] text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-md hover:bg-[#fff8f5] transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px] text-[#a33900]">edit_note</span>
                <span>Add Note</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectFestival('diwali')}
                className="h-10 px-4 rounded-xl bg-[#a33900] text-white text-[13px] font-semibold flex items-center justify-center gap-1 shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Muhurat Guide</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Inline Note Box (Toggled) */}
            {showDiwaliNoteDrawer && (
              <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/15">
                <label className="text-[11px] text-[#ffdbce] font-medium" htmlFor="diwali-quick-note">
                  Personal Celebration Notes &amp; Puja List
                </label>
                <div className="flex gap-2">
                  <input
                    id="diwali-quick-note"
                    type="text"
                    value={diwaliNoteInput}
                    onChange={(e) => setDiwaliNoteInput(e.target.value)}
                    placeholder="e.g. Bring Kaju Katli, Marigold malas at 4 PM"
                    className="flex-1 h-9 px-3 rounded-lg bg-white/15 text-white placeholder:text-white/50 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveDiwaliNote();
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSaveDiwaliNote}
                    className="h-9 px-3 rounded-lg bg-[#ca4b07] text-white text-[12px] font-semibold hover:brightness-110"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Section Heading: Upcoming Auspicious Days */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <h3 className="text-[19px] text-[#201a16] font-bold">Upcoming Celebrations</h3>
            <p className="text-[11px] text-[#594139]">Kartik &amp; Magha Maas 2024–2025</p>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#f2e6dd] text-[#a33900] font-semibold">
            {sorted.length} Next
          </span>
        </div>

        {/* Festival List Collection */}
        <div className="flex flex-col gap-3.5">
          {sorted.map((fest) => {
            const isDiwali = fest.id === 'diwali';
            const isGovardhan = fest.id === 'govardhan';
            const isChhath = fest.id === 'chhath';
            const isExpanded = expandedNotesCard === fest.id;

            return (
              <div
                key={fest.id}
                className="w-full bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all border border-[#f2e6dd]/70 flex flex-col gap-2"
              >
                <div
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => onSelectFestival(fest.id)}
                >
                  {/* Calendar Date Pill */}
                  <div className="flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-[#f2e6dd] text-[#201a16] shrink-0 border border-[#e1bfb4]/40">
                    <span className="text-[11px] text-[#594139] uppercase font-semibold">
                      {fest.month}
                    </span>
                    <span className="text-[19px] font-bold text-[#a33900] leading-none">
                      {fest.day}
                    </span>
                  </div>

                  {/* Festival Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] text-[#20656b] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {isGovardhan ? 'potted_plant' : isChhath ? 'water' : 'flare'}
                        </span>
                        {fest.tithi}
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                          fest.countdown.includes('In')
                            ? 'bg-[#ffdad8] text-[#410006]'
                            : 'bg-[#ede0d8] text-[#594139]'
                        }`}
                      >
                        {fest.countdown}
                      </span>
                    </div>
                    <h4 className="text-[16px] text-[#201a16] font-bold mt-0.5 truncate hover:text-[#a33900] transition-colors">
                      {fest.name}
                    </h4>
                    <p className="text-[13px] text-[#594139] line-clamp-1">{fest.description}</p>
                  </div>
                </div>

                {/* Meta Footer: Tags & Notes Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f8ece3]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#f8ece3] text-[#594139] text-[11px]">
                      {fest.region}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#3d7e84]/15 text-[#20656b] text-[11px] flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {fest.muhuratTime}
                    </span>
                  </div>

                  {/* Note Counter or Add Note Pill */}
                  {fest.notesCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => toggleExpandNote(fest.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ffdbce] text-[#370e00] text-[11px] font-semibold active:scale-95 transition-transform hover:bg-[#ffb599]"
                    >
                      <span className="material-symbols-outlined text-[15px]">sticky_note_2</span>
                      <span>
                        {fest.notesCount} {fest.notesCount === 1 ? 'Note' : 'Notes'}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickAddPrompt(fest)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2e6dd] text-[#201a16] text-[11px] hover:bg-[#ede0d8] active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#a33900]">add_circle</span>
                      <span>Add Note</span>
                    </button>
                  )}
                </div>

                {/* Expandable Note Drawer for Govardhan */}
                {isExpanded && fest.notes && (
                  <div className="p-3 rounded-xl bg-[#f8ece3] text-[#201a16] text-[13px] mt-1 border border-[#e1bfb4]/40 flex flex-col gap-1.5 animate-fadeIn">
                    {fest.notes.map((n, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[#594139]">
                        <span className="material-symbols-outlined text-[15px] text-[#a33900] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Auspicious Festive Quote */}
        <div className="w-full rounded-2xl bg-[#f8ece3] p-5 text-center flex flex-col items-center justify-center gap-1 shadow-xs mt-2 border border-[#f2e6dd]">
          <span className="material-symbols-outlined text-[#a33900] text-[28px]">spa</span>
          <p className="text-[18px] text-[#201a16] font-bold tracking-tight">
            "Sarve Bhavantu Sukhinah"
          </p>
          <p className="text-[12px] text-[#594139] max-w-[300px]">
            May the festive glow bring peace, prosperity, and joyous celebrations to your family.
          </p>
        </div>
      </div>
    </div>
  );
};
