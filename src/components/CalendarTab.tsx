import React, { useState } from 'react';
import { Festival } from '../data/utsavData';

interface CalendarTabProps {
  festivals: Festival[];
  onSelectFestival: (festivalId: string) => void;
  onOpenNewNoteForDate: (dateStr: string) => void;
  onShowToast: (msg: string) => void;
}

const CITIES = ['New Delhi', 'Varanasi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Jaipur', 'Ahmedabad'];

export const CalendarTab: React.FC<CalendarTabProps> = ({
  festivals,
  onSelectFestival,
  onOpenNewNoteForDate,
  onShowToast,
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedCity, setSelectedCity] = useState<string>('New Delhi');
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [monthOffset, setMonthOffset] = useState<number>(0);

  // Month data: November 2024 (starts on Friday = index 5)
  const monthName = monthOffset === 0 ? 'November 2024' : monthOffset === 1 ? 'December 2024' : 'October 2024';
  const vikramSamvat = 'Kartik - Agrahayana 2081 Vikrami';

  // Specific details for selected date
  const dateInfo = {
    day: selectedDay,
    dateString: `Friday, ${selectedDay} November 2024`,
    tithi: selectedDay === 1 ? 'Kartik Krishna Paksha Amavasya' : selectedDay === 2 ? 'Kartik Shukla Pratipada' : selectedDay === 3 ? 'Kartik Shukla Dwitiya' : selectedDay === 7 ? 'Kartik Shukla Shashti' : selectedDay === 15 ? 'Kartik Purnima' : 'Kartik Maas Shubh Tithi',
    sunrise: selectedCity === 'Varanasi' ? '06:18 AM' : selectedCity === 'Mumbai' ? '06:44 AM' : '06:33 AM',
    sunset: selectedCity === 'Kolkata' ? '05:04 PM' : selectedCity === 'Mumbai' ? '06:02 PM' : '05:35 PM',
    tithiTill: '06:16 PM',
    muhurat: selectedDay === 1 ? '05:36 PM to 06:16 PM (Duration: 41 mins)' : '06:30 AM to 08:15 AM (Pratahkal)',
    festivals: selectedDay === 1 ? ['Diwali (Lakshmi Puja)', 'Kali Puja', 'Narak Chaturdashi'] : selectedDay === 2 ? ['Govardhan Puja', 'Annakut'] : selectedDay === 3 ? ['Bhai Dooj', 'Yama Dwitiya'] : selectedDay === 7 ? ['Chhath Puja Sandhya Arghya'] : selectedDay === 15 ? ['Dev Deepawali', 'Guru Nanak Jayanti'] : ['Auspicious Day'],
    note: selectedDay === 1 ? 'Puja with family at 6:30 PM, gifts ready. Mithai boxes packed for neighbors.' : 'Plan preparations and temple offerings.',
  };

  const handleShareDate = () => {
    if (navigator.share) {
      navigator.share({
        title: `${dateInfo.dateString} - Utsav Panchang`,
        text: `${dateInfo.dateString}: ${dateInfo.tithi}, Sunrise ${dateInfo.sunrise}, Muhurat ${dateInfo.muhurat}`,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${dateInfo.dateString} - Muhurat: ${dateInfo.muhurat}`);
      onShowToast('Panchang details copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 animate-fadeIn">
      {/* Top Selector & Navigation Card */}
      <section className="flex flex-col w-full bg-[#fef1e9] rounded-2xl p-4 shadow-xs border border-[#f2e6dd] gap-4">
        {/* View Mode Switcher & City Selector */}
        <div className="flex items-center justify-between">
          <div className="inline-flex p-1 bg-[#ede0d8] rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#a33900] text-white shadow-xs'
                  : 'text-[#594139] hover:text-[#201a16]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">calendar_view_month</span>
              <span>Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-[#a33900] text-white shadow-xs'
                  : 'text-[#594139] hover:text-[#201a16]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_agenda</span>
              <span>List</span>
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCityPicker(!showCityPicker)}
              className="flex items-center gap-1 text-[#a33900] px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#fff8f5] text-[12px] font-semibold border border-[#e1bfb4]/40 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{selectedCity}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
            </button>

            {showCityPicker && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-[#f2e6dd] py-1 z-30 animate-fadeIn">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityPicker(false);
                      onShowToast(`Panchang adjusted for ${city}`);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#fff8f5] ${
                      selectedCity === city ? 'font-bold text-[#a33900]' : 'text-[#201a16]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Month Navigator Header */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => setMonthOffset((m) => m - 1)}
            aria-label="Previous month"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#fff8f5] text-[#201a16] shadow-xs border border-[#f2e6dd]"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <div className="flex flex-col items-center">
            <h2 className="text-[18px] text-[#201a16] font-bold tracking-tight flex items-center gap-1.5">
              <span>{monthName}</span>
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#a33900] animate-pulse" />
            </h2>
            <span className="text-[11px] text-[#a33900] font-semibold">{vikramSamvat}</span>
          </div>

          <button
            type="button"
            onClick={() => setMonthOffset((m) => m + 1)}
            aria-label="Next month"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-[#fff8f5] text-[#201a16] shadow-xs border border-[#f2e6dd]"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        {/* 7-Day Weekday Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#594139] font-bold py-0.5">
          <span className="text-[#b12a33]">S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span className="text-[#a33900]">F</span>
          <span>S</span>
        </div>

        {/* Calendar Grid (November 2024 starts on Friday) */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Previous month days (27, 28, 29, 30, 31) */}
          {[27, 28, 29, 30, 31].map((prevDay) => (
            <div
              key={`prev-${prevDay}`}
              className="h-10 rounded-lg flex flex-col items-center justify-center opacity-30 text-[#594139] text-[12px]"
            >
              {prevDay}
            </div>
          ))}

          {/* Days 1 to 30 */}
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isSelected = selectedDay === day;
            const isDiwali = day === 1;
            const isGovardhan = day === 2;
            const isBhaiDooj = day === 3;
            const isChhath = day === 7;
            const isDevDeepawali = day === 15;
            const isPradosh = day === 27;

            const isSunday = (day + 5 - 1) % 7 === 0;
            const isFriday = (day + 5 - 1) % 7 === 5;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`relative h-10 rounded-xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#ca4b07] text-white shadow-md ring-2 ring-[#ffdbce] scale-105 z-10'
                    : isDiwali || isGovardhan || isBhaiDooj || isChhath || isDevDeepawali
                    ? 'bg-[#f8ece3] hover:bg-[#f2e6dd] text-[#201a16]'
                    : 'bg-white hover:bg-[#f8ece3] text-[#201a16]'
                }`}
              >
                <span
                  className={`text-[13px] leading-none font-semibold ${
                    isSelected
                      ? 'text-white'
                      : isSunday
                      ? 'text-[#b12a33]'
                      : isFriday
                      ? 'text-[#a33900]'
                      : 'text-[#201a16]'
                  }`}
                >
                  {day}
                </span>

                {/* Auspicious Dots / Badges */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  {isDiwali && (
                    <span className="material-symbols-outlined text-[10px] text-amber-300 leading-none">
                      mode_heat
                    </span>
                  )}
                  {isGovardhan && <span className="w-1.5 h-1.5 rounded-full bg-[#a33900]" />}
                  {isBhaiDooj && <span className="w-1.5 h-1.5 rounded-full bg-[#a33900]" />}
                  {isChhath && (
                    <>
                      <span className="material-symbols-outlined text-[9px] text-[#ca4b07] leading-none">
                        wb_sunny
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b12a33]" />
                    </>
                  )}
                  {isDevDeepawali && (
                    <>
                      <span className="material-symbols-outlined text-[9px] text-[#20656b] leading-none">
                        brightness_7
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a33900]" />
                    </>
                  )}
                  {isPradosh && <span className="w-1.5 h-1.5 rounded-full bg-[#b12a33]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Legend */}
        <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#594139] border-t border-[#f2e6dd]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#a33900]" />
            <span>Major Festival</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#b12a33]" />
            <span>Vrat &amp; Fasting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[13px] text-[#20656b]">
              brightness_7
            </span>
            <span>Purnima / Amavasya</span>
          </div>
        </div>
      </section>

      {/* Selected Date Details Drawer / Card */}
      <article className="flex flex-col w-full bg-white rounded-2xl p-4 shadow-sm border border-[#f2e6dd] gap-3 relative overflow-hidden">
        {/* Traditional Auspicious Gold Accent Bar */}
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#a33900]" />

        {/* Card Header with Panchang Paksha Details */}
        <div className="flex items-start justify-between pl-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-bold">
                {selectedDay === 1 ? 'Today' : `Day ${selectedDay}`}
              </span>
              <span className="text-[#20656b] text-[11px] font-semibold">
                Shubh Muhurat Active
              </span>
            </div>
            <h3 className="text-[19px] text-[#201a16] font-bold mt-1">
              Friday, {selectedDay} November 2024
            </h3>
            <p className="text-[13px] text-[#594139]">{dateInfo.tithi}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ffb599]/60 flex items-center justify-center text-[#a33900] shadow-xs shrink-0">
            <span className="material-symbols-outlined text-[24px]">mode_heat</span>
          </div>
        </div>

        {/* Panchang Solar & Tithi Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 bg-[#fef1e9] rounded-xl p-3 pl-3.5 border border-[#f2e6dd]">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#594139]">
              <span className="material-symbols-outlined text-[15px] text-[#a33900]">
                wb_twilight
              </span>
              <span className="text-[11px] font-semibold">Sunrise</span>
            </div>
            <span className="text-[13px] text-[#201a16] mt-0.5 font-bold">
              {dateInfo.sunrise}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#594139]">
              <span className="material-symbols-outlined text-[15px] text-[#b12a33]">
                wb_sunny
              </span>
              <span className="text-[11px] font-semibold">Sunset</span>
            </div>
            <span className="text-[13px] text-[#201a16] mt-0.5 font-bold">
              {dateInfo.sunset}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#594139]">
              <span className="material-symbols-outlined text-[15px] text-[#20656b]">
                timelapse
              </span>
              <span className="text-[11px] font-semibold">Tithi Till</span>
            </div>
            <span className="text-[13px] text-[#201a16] mt-0.5 font-bold">
              {dateInfo.tithiTill}
            </span>
          </div>
        </div>

        {/* Muhurat Special Banner */}
        <div className="flex items-center gap-3 bg-[#ffdbce]/40 rounded-xl p-3 pl-3.5 border border-[#ffdbce]/60">
          <span className="material-symbols-outlined text-[#a33900] text-[20px]">stars</span>
          <div className="flex flex-col">
            <span className="text-[13px] text-[#201a16] font-bold">Lakshmi Puja Muhurat</span>
            <span className="text-[12px] text-[#594139]">{dateInfo.muhurat}</span>
          </div>
        </div>

        {/* Festivals on this Day */}
        <div className="flex flex-col gap-1.5 pl-2">
          <span className="text-[11px] text-[#594139] tracking-wider uppercase font-bold">
            Festivals &amp; Celebrations
          </span>
          <div className="flex flex-wrap gap-2">
            {dateInfo.festivals.map((festName, i) => (
              <button
                key={festName}
                type="button"
                onClick={() => onSelectFestival(selectedDay === 1 ? 'diwali' : 'govardhan')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-transform active:scale-95 ${
                  i === 0
                    ? 'bg-[#fd6264] text-white shadow-xs'
                    : 'bg-[#f2e6dd] text-[#201a16] hover:bg-[#ede0d8]'
                }`}
              >
                {i === 0 && <span className="material-symbols-outlined text-[14px]">auto_awesome</span>}
                {festName}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Visual Highlight Placeholder for Selected Festival */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-xs">
          <img
            className="w-full h-full object-cover"
            alt="Deepotsav celebration lamps"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATZNwy8H2mLmx4mtovFpl1Zpa57V-m5nPnE-GZ9NclpKrOMjn50sKRhv_Usxr2-uKX3aY4RiFyJ5PjsR3vYhOPZF1JSCbTAwVl5cJGwlYeyqAzpa5uiQJeXWnyW5BTVBCqZAJILzCAlvfktDNWTiuPey8AIYpVPzrfskxGt_FqB2mldw6W2zR0g74Fn01xEIM2ldXx_JMeZtvYPvsfb24GMKhOtMBxlmRpCXg6WXzx6-I7dWO8uSEC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end p-3">
            <div className="text-white">
              <p className="text-[11px] opacity-90">Deepotsav Amavasya</p>
              <p className="text-[15px] font-bold leading-tight">
                Festival of Lights &amp; Prosperity
              </p>
            </div>
          </div>
        </div>

        {/* Personal Note Preview for this date */}
        <div className="flex flex-col bg-[#fef1e9] rounded-xl p-3 pl-3.5 gap-1 border border-[#f2e6dd]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#a33900] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">edit_note</span>
              My Festive Note
            </span>
            <button
              type="button"
              onClick={() => onOpenNewNoteForDate(dateInfo.dateString)}
              className="text-[#594139] hover:text-[#a33900] transition-colors"
              aria-label="Edit note"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>
          <p className="text-[13px] text-[#201a16] italic">"{dateInfo.note}"</p>
        </div>

        {/* Quick Action: Add/Manage Notes */}
        <div className="flex items-center gap-2 pt-1 pl-2">
          <button
            type="button"
            onClick={() => onOpenNewNoteForDate(dateInfo.dateString)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#a33900] hover:bg-[#ca4b07] text-white active:scale-98 transition-all shadow-xs text-[13px] font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add Note for this Date</span>
          </button>
          <button
            type="button"
            onClick={handleShareDate}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f8ece3] text-[#594139] hover:text-[#a33900] transition-colors"
            aria-label="Share date details"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </article>

      {/* Upcoming Auspicious Days Summary Strip */}
      <section className="flex flex-col w-full gap-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-[18px] text-[#201a16] font-bold">Upcoming Auspicious Days</h4>
          <span className="text-[11px] text-[#a33900] font-bold">View All (8)</span>
        </div>

        {/* Horizontal Scrolling Strip */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
          {[
            {
              date: 'Sat, Nov 2',
              title: 'Govardhan Puja',
              sub: 'Annakoot Utsav • Kartik Pratipada',
              time: 'Pratahkal 06:34 AM',
              color: 'bg-[#ffdad8] text-[#410006]',
              icon: 'temple_hindu',
              festId: 'govardhan',
            },
            {
              date: 'Sun, Nov 3',
              title: 'Bhai Dooj',
              sub: 'Yama Dwitiya • Kartik Shukla',
              time: 'Aparahna 01:10 PM',
              color: 'bg-[#ffdbce] text-[#370e00]',
              icon: 'family_restroom',
              festId: 'bhaidooj',
            },
            {
              date: 'Thu, Nov 7',
              title: 'Chhath Puja',
              sub: 'Sandhya Arghya • Surya Puja',
              time: 'Sunset Arghya 05:32 PM',
              color: 'bg-[#ede0d8] text-[#201a16]',
              icon: 'wb_sunny',
              festId: 'chhath',
            },
            {
              date: 'Fri, Nov 15',
              title: 'Dev Deepawali',
              sub: 'Kartik Purnima • Tripurotsav',
              time: 'Pradosh 05:10 PM',
              color: 'bg-[#adeef4] text-[#002022]',
              icon: 'local_fire_department',
              festId: 'devdeepawali',
            },
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => onSelectFestival(item.festId)}
              className="shrink-0 w-52 bg-[#fef1e9] rounded-2xl p-3.5 flex flex-col gap-1.5 shadow-xs hover:shadow-md border border-[#f2e6dd] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${item.color}`}>
                  {item.date}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#a33900]">
                  {item.icon}
                </span>
              </div>
              <h5 className="text-[15px] text-[#201a16] font-bold truncate mt-0.5">
                {item.title}
              </h5>
              <p className="text-[11px] text-[#594139] truncate">{item.sub}</p>
              <div className="flex items-center gap-1 text-[#20656b] text-[11px] font-medium mt-1">
                <span className="material-symbols-outlined text-[14px]">alarm</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
