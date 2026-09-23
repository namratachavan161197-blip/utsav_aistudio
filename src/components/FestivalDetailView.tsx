import React, { useState } from 'react';
import { Festival, NoteItem } from '../data/utsavData';

interface FestivalDetailViewProps {
  festivalId: string;
  festivals: Festival[];
  notes: NoteItem[];
  onBack: () => void;
  onOpenSamagri: () => void;
  onOpenNewNote: () => void;
  onShowToast: (msg: string) => void;
}

export const FestivalDetailView: React.FC<FestivalDetailViewProps> = ({
  festivalId,
  festivals,
  notes,
  onBack,
  onOpenSamagri,
  onOpenNewNote,
  onShowToast,
}) => {
  const festival = festivals.find((f) => f.id === festivalId) || festivals[0];

  const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Checkbox state for Home Decor & Puja Setup
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Buy 51 clay diyas and pure desi ghee', completed: true },
    { id: '2', text: 'Get fresh marigold and mango leaves for toran', completed: true },
    { id: '3', text: 'Rangoli stencils for entrance', completed: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  const handleToggleAlarm = () => {
    setIsAlarmSet(!isAlarmSet);
    onShowToast(!isAlarmSet ? 'Alarm set for 6:12 PM Shubh Muhurat' : 'Muhurat alarm removed');
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onShowToast(!isBookmarked ? 'Festival bookmarked to favorites' : 'Removed from bookmarks');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${festival.name} - Shubh Muhurat & Rituals`,
        text: `Check out Shubh Muhurat (${festival.muhuratTime}) and rituals for ${festival.name} on Utsav app!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-fadeIn">
      {/* Detail Top Sub-Bar */}
      <div className="sticky top-16 z-30 bg-[#fff8f5]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-[#f2e6dd]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#594139] hover:text-[#a33900] text-[13px] font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Festivals</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full hover:bg-[#f2e6dd] flex items-center justify-center text-[#594139] transition-colors"
            aria-label="Share festival"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 flex flex-col gap-4">
        {/* Festive Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#362f2a] text-[#fbeee6] shadow-xl">
          {/* Background Ambient Artwork */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen pointer-events-none scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzkpZ9LgXkk8FVxp-nd9qvXFF4I1F2KXJPVpN8D-o072L1sqWNkcbrYqJG3GO1593ZNIozVeO8FbYc_3P4ZvD7Q5kkKv-PAm0kkndjn22ecvi16DuxWIDfzqayR1loOAPk1hnhXpF1O54Fk8_ysTDSPWIsFY4wEiuHTusbJv6W6Vs85qExGB3jrBD1d_WIo-S6RP8zu2KLzgmRZcWfbjvcSpsIBATXVPoJr3MdZSXA5KJ2mDJvWn89')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#362f2a] via-[#362f2a]/60 to-transparent pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ca4b07]/30 backdrop-blur-md text-[#ffdbce] text-[11px] font-semibold tracking-wide border border-[#ffdbce]/20">
                <span className="material-symbols-outlined text-[14px] text-[#ffdbce]">flare</span>
                {festival.tithi}
              </span>
              <span className="inline-flex items-center text-[#ffb599] text-[11px] font-medium gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                Vikram Samvat 2081
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-[30px] text-white font-bold tracking-tight">
                  {festival.name}
                </h2>
                {festival.hindiName && (
                  <span className="text-[18px] text-[#ffb599] font-medium font-outfit">
                    {festival.hindiName}
                  </span>
                )}
              </div>
              <p className="text-[15px] text-[#ffdbce] font-medium mt-0.5">
                {festival.displayDate}
              </p>
            </div>

            {/* Shubh Muhurat Glow Box */}
            <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 shadow-inner border border-white/15">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-[#ffdbce]">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  <span className="text-[12px] font-bold tracking-wider uppercase">
                    Shubh Lakshmi Puja Muhurat
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#a33900] text-white text-[11px] font-semibold">
                  Auspicious
                </span>
              </div>
              <div className="flex items-baseline gap-2 text-white">
                <span className="text-[22px] font-bold text-[#ffdbce]">
                  06:12 PM – 08:05 PM
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[#ede0d8] text-[13px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  Duration: 1 hr 53 mins
                </span>
                <span className="opacity-40">•</span>
                <span>Pradosh Kaal Window</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-4 gap-2 bg-[#fef1e9] p-2 rounded-2xl shadow-xs border border-[#f2e6dd]">
          <button
            type="button"
            onClick={handleShare}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-[#f2e6dd] transition-colors active:scale-95 text-[#201a16]"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffdbce]/60 flex items-center justify-center text-[#a33900] mb-1">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
            <span className="text-[11px] font-semibold text-center">Share</span>
          </button>

          <button
            type="button"
            onClick={handleToggleAlarm}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-[#f2e6dd] transition-colors active:scale-95 text-[#201a16]"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
              isAlarmSet ? 'bg-[#20656b] text-white' : 'bg-[#adeef4]/50 text-[#20656b]'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {isAlarmSet ? 'alarm_on' : 'alarm_add'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-center">
              {isAlarmSet ? '6:12 PM Set' : 'Set Alarm'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenSamagri}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-[#f2e6dd] transition-colors active:scale-95 text-[#201a16]"
          >
            <div className="w-10 h-10 rounded-full bg-[#ede0d8] flex items-center justify-center text-[#594139] mb-1">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <span className="text-[11px] font-semibold text-center">Samagri</span>
          </button>

          <button
            type="button"
            onClick={handleToggleBookmark}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-[#f2e6dd] transition-colors active:scale-95 text-[#201a16]"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
              isBookmarked ? 'bg-[#b12a33] text-white' : 'bg-[#ffdad8] text-[#b12a33]'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-center">
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </span>
          </button>
        </div>

        {/* Significance & Rituals Accordion */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[19px] text-[#201a16] font-bold">Significance &amp; Rituals</h3>
            <span className="text-[11px] text-[#594139] uppercase tracking-wider font-semibold">
              Kartik Mahotsav
            </span>
          </div>

          {/* Accordion Item 1 */}
          <details className="group rounded-2xl bg-[#f8ece3] p-4 shadow-xs border border-[#f2e6dd]" open>
            <summary className="flex items-center justify-between cursor-pointer list-none text-[15px] font-bold text-[#201a16]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#a33900] text-[22px]">
                  water_drop
                </span>
                <span className="truncate">Evening Lakshmi &amp; Ganesha Puja</span>
              </div>
              <span className="material-symbols-outlined text-[#594139] text-[20px] transition-transform duration-200 group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-3 text-[#594139] text-[13px] flex flex-col gap-2 leading-relaxed">
              <p>
                Invoke auspicious energies by performing the shodashopachara rituals during Pradosh
                Kaal. Place fresh lotus flowers, batasha sweets, and five whole betel nuts alongside
                silver coins to welcome Maa Lakshmi and Lord Ganesha.
              </p>
              <div className="mt-1 flex items-center gap-2 p-2.5 rounded-xl bg-[#ede0d8]/60 text-[#201a16] text-[12px]">
                <span className="material-symbols-outlined text-[16px] text-[#20656b] shrink-0">
                  lightbulb
                </span>
                <span>Tip: Face East or North while performing the central Sankalpa.</span>
              </div>
            </div>
          </details>

          {/* Accordion Item 2 */}
          <details className="group rounded-2xl bg-[#f8ece3] p-4 shadow-xs border border-[#f2e6dd]">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[15px] font-bold text-[#201a16]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#a33900] text-[22px]">
                  local_fire_department
                </span>
                <span className="truncate">Lighting Diyas &amp; Deep Daan</span>
              </div>
              <span className="material-symbols-outlined text-[#594139] text-[20px] transition-transform duration-200 group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-3 text-[#594139] text-[13px] leading-relaxed">
              <p>
                Light the prime four-wick Sarvatomukhi brass or clay diya first with pure cow ghee.
                Position pairs of earthen mustard oil diyas across threshold boundaries, balconies,
                water storage, and Tulsi Vrindavan to dispel darkness.
              </p>
            </div>
          </details>

          {/* Accordion Item 3 */}
          <details className="group rounded-2xl bg-[#f8ece3] p-4 shadow-xs border border-[#f2e6dd]">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[15px] font-bold text-[#201a16]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[#a33900] text-[22px]">
                  bakery_dining
                </span>
                <span className="truncate">Naivedya &amp; Sweets Preparation</span>
              </div>
              <span className="material-symbols-outlined text-[#594139] text-[20px] transition-transform duration-200 group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="pt-3 text-[#594139] text-[13px] leading-relaxed">
              <p>
                Prepare Kheer, Mohan Thal, or Besan Laddus in the morning using freshly roasted dry
                fruits. Traditional offerings also include sweetened popped lotus seeds (makhana) and
                puffed rice with batasha for neighbors and family.
              </p>
            </div>
          </details>
        </div>

        {/* Visual Storytelling Miniature Carousel Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#f2e6dd] h-32 flex items-center p-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXuKyA_ujRm1FbLRMUjaCIakNZ3BWB-_AfM0OKi-a6CJxJid-NJtGRKuyN0sYzvJ9AfySZ2tN3aw25gMuIhcUZNUem5_C71Mtpk-Mqxb8IBPNYd_zH8pw53_i2h4-SUydv11kf1ydnONt0OdtIguQS00IClMKE49X3I6y235KGUFzAzG9VJ5d5Icjk50evo9EPR-sZAHS3eMA0oVRcI6NXgd0i_wp1Zo_o3h2PNYY8_qCOOC66a-36')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
          <div className="relative z-10 max-w-[70%]">
            <span className="text-[11px] text-[#a33900] font-bold uppercase tracking-wider">
              Puja Decor Inspiration
            </span>
            <h4 className="text-[16px] text-[#201a16] font-bold leading-snug mt-0.5">
              Courtyard &amp; Entrance Rangoli
            </h4>
            <p className="text-[12px] text-[#594139] mt-0.5 truncate">
              Geometric lotus petals &amp; brass deepams
            </p>
          </div>
        </div>

        {/* My Notes & Preparation Section */}
        <div className="mt-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a33900] text-[22px]">draw</span>
              <h3 className="text-[19px] text-[#201a16] font-bold">My Notes &amp; Preparation</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-bold">
                2
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenNewNote}
              className="inline-flex items-center gap-1 text-[#a33900] text-[13px] font-bold hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Add Note</span>
            </button>
          </div>

          {/* Active Note Card 1: Sweets & Gifts */}
          <div className="rounded-2xl bg-[#f8ece3] p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdad8] flex items-center justify-center text-[#b12a33]">
                  <span className="material-symbols-outlined text-[18px]">
                    featured_seasonal_and_gifts
                  </span>
                </div>
                <div>
                  <h4 className="text-[15px] text-[#201a16] font-bold">
                    Sweets &amp; Gifts Distribution List
                  </h4>
                  <span className="text-[11px] text-[#594139]">Edited yesterday</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 rounded-full hover:bg-[#ede0d8] flex items-center justify-center"
                  aria-label="Edit note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Note deleted')}
                  className="w-8 h-8 rounded-full hover:bg-[#ede0d8] flex items-center justify-center text-red-600"
                  aria-label="Delete note"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            <p className="text-[13px] text-[#594139] leading-relaxed pl-10">
              Pick up Kaju Katli boxes from Bikanerwala at 11 AM; deliver dry fruit hampers to
              Sharma ji and Verma family before 4 PM.
            </p>
            <div className="pl-10 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ede0d8] text-[#594139] text-[11px] font-medium">
                Family &amp; Friends
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbce]/70 text-[#a33900] text-[11px] font-bold">
                High Priority
              </span>
            </div>
          </div>

          {/* Active Note Card 2: Home Decor & Puja Setup Checklist */}
          <div className="rounded-2xl bg-[#f8ece3] p-4 shadow-xs border border-[#f2e6dd] flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#adeef4] flex items-center justify-center text-[#20656b]">
                  <span className="material-symbols-outlined text-[18px]">checklist_rtl</span>
                </div>
                <div>
                  <h4 className="text-[15px] text-[#201a16] font-bold">
                    Home Decor &amp; Puja Setup
                  </h4>
                  <span className="text-[11px] text-[#594139]">Updated today, 09:30 AM</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#594139]">
                <button
                  type="button"
                  onClick={onOpenNewNote}
                  className="w-8 h-8 rounded-full hover:bg-[#ede0d8] flex items-center justify-center"
                  aria-label="Edit note"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="flex flex-col gap-2.5 mt-1 pl-10">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 rounded text-[#a33900] focus:ring-[#ca4b07] accent-[#a33900] cursor-pointer"
                  />
                  <span
                    className={`text-[13px] transition-all ${
                      item.completed
                        ? 'line-through text-[#594139] opacity-75'
                        : 'text-[#201a16] font-medium'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            {/* Progress Mini Bar */}
            <div className="mt-2 pl-10 flex items-center gap-3">
              <div className="w-full bg-[#ede0d8] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#a33900] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-[11px] text-[#594139] font-medium whitespace-nowrap">
                {completedCount} of {checklist.length} done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40 pointer-events-none max-w-md mx-auto">
        <button
          type="button"
          onClick={onOpenNewNote}
          className="pointer-events-auto w-full h-12 bg-[#a33900] hover:bg-[#ca4b07] text-white rounded-2xl shadow-xl flex items-center justify-center gap-2 text-[14px] font-bold active:scale-98 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>Edit Notes &amp; Checklist</span>
        </button>
      </div>
    </div>
  );
};
