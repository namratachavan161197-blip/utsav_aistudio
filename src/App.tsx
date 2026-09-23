import React, { useState, useEffect } from 'react';
import { INITIAL_FESTIVALS, INITIAL_NOTES, Festival, NoteItem } from './data/utsavData';
import { FestivalsTab } from './components/FestivalsTab';
import { FestivalDetailView } from './components/FestivalDetailView';
import { CalendarTab } from './components/CalendarTab';
import { MyNotesTab } from './components/MyNotesTab';
import { ProfileTab } from './components/ProfileTab';
import { SamagriModal } from './components/SamagriModal';
import { NewNoteModal } from './components/NewNoteModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';

export function App() {
  const [currentTab, setCurrentTab] = useState<'festivals' | 'calendar' | 'notes' | 'profile'>('festivals');
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);

  // Persistent state for notes and festivals
  const [festivals, setFestivals] = useState<Festival[]>(() => {
    const saved = localStorage.getItem('utsav_festivals');
    return saved ? JSON.parse(saved) : INITIAL_FESTIVALS;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('utsav_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  useEffect(() => {
    localStorage.setItem('utsav_festivals', JSON.stringify(festivals));
  }, [festivals]);

  useEffect(() => {
    localStorage.setItem('utsav_notes', JSON.stringify(notes));
  }, [notes]);

  // Modal states
  const [showSamagriModal, setShowSamagriModal] = useState<boolean>(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState<boolean>(false);
  const [newNoteInitialFest, setNewNoteInitialFest] = useState<string>('Diwali 2024');
  const [showFlutterModal, setShowFlutterModal] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleOpenFestivalDetail = (festId: string) => {
    setSelectedFestivalId(festId);
  };

  const handleBackToFestivals = () => {
    setSelectedFestivalId(null);
  };

  const handleAddQuickNote = (festivalName: string, text: string) => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      festivalId: festivalName.toLowerCase().replace(/\s+/g, '-'),
      festivalName,
      title: `${festivalName} Preparation`,
      category: 'Rituals',
      timeAgo: 'Just now',
      description: text,
      hasReminder: true,
      reminder: 'Active alert',
    };
    setNotes((prev) => [newNote, ...prev]);

    // Update notes count on festival if matches
    setFestivals((prev) =>
      prev.map((f) =>
        f.name.toLowerCase().includes(festivalName.toLowerCase())
          ? { ...f, notesCount: (f.notesCount || 0) + 1, notes: [...(f.notes || []), text] }
          : f
      )
    );
  };

  const handleSaveNoteFromModal = (noteData: Partial<NoteItem>) => {
    const newNote: NoteItem = {
      id: noteData.id || `note-${Date.now()}`,
      festivalId: 'diwali',
      festivalName: noteData.festivalName || 'Diwali 2024',
      title: noteData.title || 'New Note',
      category: noteData.category || 'Shopping',
      timeAgo: 'Just now',
      description: noteData.description || '',
      hasReminder: !!noteData.hasReminder,
      reminder: noteData.reminder,
      budget: noteData.budget,
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast('New note added to preparation list!');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    showToast('Note deleted');
  };

  const handleAddAllSamagriToNotes = (items: string[]) => {
    const samagriNote: NoteItem = {
      id: `note-${Date.now()}`,
      festivalId: 'diwali',
      festivalName: 'Diwali 2024',
      title: 'Lakshmi Puja Vedic Samagri List',
      category: 'Shopping',
      timeAgo: 'Just now',
      description: `Complete puja samagri list:\n${items.map((it, idx) => `${idx + 1}. ${it}`).join('\n')}`,
      hasReminder: true,
      reminder: 'Friday, 10:00 AM',
    };
    setNotes((prev) => [samagriNote, ...prev]);
    showToast('All 8 Samagri items added to My Notes!');
  };

  const handleOpenNoteForDate = (dateStr: string) => {
    setNewNoteInitialFest(dateStr);
    setShowNewNoteModal(true);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#201a16] flex justify-center selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Mobile-sized shell centered on desktop */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#fff8f5] shadow-2xl relative">
        {/* Top App Header */}
        <header className="sticky top-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-[#f2e6dd]/80 transition-all">
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => {
              setSelectedFestivalId(null);
              setCurrentTab('festivals');
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UlBY3BtSzUkWJSHy9FE25dcEd8thes05Kyn8VBBs-S-b9ETWd59aOmIEwzGsmi2sf8rQZ4NZsX1KOurnMHjgdaFm52GBegFtaeaGCFFaDWyGxD-RuGsP1q7Oxj_n_3ECt8IN9fgLrJjU_nkBS7luhf8y56IBMBQBVwx9W_Tll2G08bq6qUuEaEsi-zYiEKezy_ETyP9JcOOh6JT22TvqH9IudaYnPfru3m7rBQTGQqpg4fKkyjssROGA"
              alt="Utsav Brand Icon"
              className="w-8 h-8 rounded-full shadow-xs object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[17px] font-extrabold text-[#a33900] tracking-tight leading-none font-epilogue">
                Utsav
              </span>
              <span className="text-[10px] text-[#594139] tracking-wider uppercase font-semibold">
                {selectedFestivalId
                  ? 'Festival Detail'
                  : currentTab === 'festivals'
                  ? 'Festivals'
                  : currentTab === 'calendar'
                  ? 'Calendar'
                  : currentTab === 'notes'
                  ? 'My Notes'
                  : 'Profile'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Flutter Dart button */}
            <button
              type="button"
              onClick={() => setShowFlutterModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-bold hover:bg-[#ffb599] transition-all shadow-xs"
              title="View Flutter Dart Code"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>Flutter</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => showToast('Next Shubh Muhurat: Diwali Lakshmi Puja on Nov 1 at 5:36 PM')}
              className="relative w-9 h-9 rounded-full hover:bg-[#f2e6dd] flex items-center justify-center text-[#594139] transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b12a33]" />
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={() => {
                setSelectedFestivalId(null);
                setCurrentTab('profile');
              }}
              className="w-8 h-8 rounded-full ring-2 ring-[#a33900]/20 overflow-hidden shrink-0 hover:ring-[#a33900] transition-all"
              aria-label="User Profile"
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1U6ZYouUkTtjJaSMbvBK2PU7yGdGpoaaqvHlcHaMOd4t-ObZrRkw6aflPGE8Fq2T35SLMtTo--17BWqYePDFC-a_kdXNCLLcnDko1-naI2kc-FbMqCkZpd3HFCDysp09Y9_7WVGleohiDUPUK75ysl6UJf0n5mnZ3B3f5YdNOU0qAotH9-g3QrJgvOvYNa4hewxhh8_MGOPhq0lq5WEv2cBsePpiuBwDsuRPRLNTNx_nBYHeXTAtED03js"
                alt="Namrata Chavan"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* Dynamic Screen View */}
        <main className="flex-1 flex flex-col">
          {selectedFestivalId ? (
            <FestivalDetailView
              festivalId={selectedFestivalId}
              festivals={festivals}
              notes={notes}
              onBack={handleBackToFestivals}
              onOpenSamagri={() => setShowSamagriModal(true)}
              onOpenNewNote={() => {
                setNewNoteInitialFest('Diwali 2024');
                setShowNewNoteModal(true);
              }}
              onShowToast={showToast}
            />
          ) : currentTab === 'festivals' ? (
            <FestivalsTab
              festivals={festivals}
              notes={notes}
              onSelectFestival={handleOpenFestivalDetail}
              onAddQuickNote={handleAddQuickNote}
              onShowToast={showToast}
            />
          ) : currentTab === 'calendar' ? (
            <CalendarTab
              festivals={festivals}
              onSelectFestival={handleOpenFestivalDetail}
              onOpenNewNoteForDate={handleOpenNoteForDate}
              onShowToast={showToast}
            />
          ) : currentTab === 'notes' ? (
            <MyNotesTab
              notes={notes}
              onOpenNewNote={() => {
                setNewNoteInitialFest('Diwali 2024');
                setShowNewNoteModal(true);
              }}
              onDeleteNote={handleDeleteNote}
              onShowToast={showToast}
            />
          ) : (
            <ProfileTab
              onOpenFlutterCode={() => setShowFlutterModal(true)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-[#fff8f5]/95 backdrop-blur-md border-t border-[#f2e6dd] px-3 py-1.5 flex items-center justify-around shadow-lg">
          {/* Tab 1: Festivals */}
          <button
            type="button"
            onClick={() => {
              setSelectedFestivalId(null);
              setCurrentTab('festivals');
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              currentTab === 'festivals' && !selectedFestivalId
                ? 'text-[#a33900]'
                : 'text-[#594139] hover:text-[#201a16]'
            }`}
          >
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                currentTab === 'festivals' && !selectedFestivalId ? 'bg-[#ffdbce]' : 'bg-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  currentTab === 'festivals' && !selectedFestivalId ? 'material-symbols-fill' : ''
                }`}
              >
                celebration
              </span>
            </div>
            <span className="text-[11px] font-semibold mt-0.5">Festivals</span>
          </button>

          {/* Tab 2: Calendar */}
          <button
            type="button"
            onClick={() => {
              setSelectedFestivalId(null);
              setCurrentTab('calendar');
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              currentTab === 'calendar'
                ? 'text-[#a33900]'
                : 'text-[#594139] hover:text-[#201a16]'
            }`}
          >
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                currentTab === 'calendar' ? 'bg-[#ffdbce]' : 'bg-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  currentTab === 'calendar' ? 'material-symbols-fill' : ''
                }`}
              >
                calendar_month
              </span>
            </div>
            <span className="text-[11px] font-semibold mt-0.5">Calendar</span>
          </button>

          {/* Tab 3: My Notes */}
          <button
            type="button"
            onClick={() => {
              setSelectedFestivalId(null);
              setCurrentTab('notes');
            }}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              currentTab === 'notes'
                ? 'text-[#a33900]'
                : 'text-[#594139] hover:text-[#201a16]'
            }`}
          >
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                currentTab === 'notes' ? 'bg-[#ffdbce]' : 'bg-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  currentTab === 'notes' ? 'material-symbols-fill' : ''
                }`}
              >
                checklist
              </span>
            </div>
            <span className="text-[11px] font-semibold mt-0.5">My Notes</span>
            {notes.length > 0 && (
              <span className="absolute top-0.5 right-4 w-4 h-4 rounded-full bg-[#b12a33] text-white text-[9px] font-bold flex items-center justify-center">
                {notes.length}
              </span>
            )}
          </button>

          {/* Tab 4: Profile */}
          <button
            type="button"
            onClick={() => {
              setSelectedFestivalId(null);
              setCurrentTab('profile');
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
              currentTab === 'profile'
                ? 'text-[#a33900]'
                : 'text-[#594139] hover:text-[#201a16]'
            }`}
          >
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                currentTab === 'profile' ? 'bg-[#ffdbce]' : 'bg-transparent'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  currentTab === 'profile' ? 'material-symbols-fill' : ''
                }`}
              >
                person
              </span>
            </div>
            <span className="text-[11px] font-semibold mt-0.5">Profile</span>
          </button>
        </nav>

        {/* Global Toast Banner */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#362f2a] text-[#fbeee6] text-[13px] font-medium px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-fadeIn pointer-events-none max-w-[90%]">
            <span className="material-symbols-outlined text-[#ffb599] text-[18px]">
              info
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modals */}
        <SamagriModal
          isOpen={showSamagriModal}
          onClose={() => setShowSamagriModal(false)}
          onAddAllToNotes={handleAddAllSamagriToNotes}
        />

        <NewNoteModal
          isOpen={showNewNoteModal}
          onClose={() => setShowNewNoteModal(false)}
          onSaveNote={handleSaveNoteFromModal}
          initialFestival={newNoteInitialFest}
        />

        <FlutterCodeModal
          isOpen={showFlutterModal}
          onClose={() => setShowFlutterModal(false)}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}

export default App;
