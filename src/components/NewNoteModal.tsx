import React, { useState } from 'react';
import { NoteItem } from '../data/utsavData';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (note: Partial<NoteItem>) => void;
  initialFestival?: string;
}

export const NewNoteModal: React.FC<NewNoteModalProps> = ({
  isOpen,
  onClose,
  onSaveNote,
  initialFestival,
}) => {
  const [title, setTitle] = useState('');
  const [festival, setFestival] = useState(initialFestival || 'Diwali 2024');
  const [category, setCategory] = useState<'Shopping' | 'Rituals' | 'Guests' | 'Gifts' | 'Catering'>('Shopping');
  const [description, setDescription] = useState('');
  const [hasReminder, setHasReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('Tomorrow, 10:00 AM');
  const [budget, setBudget] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveNote({
      id: `note-${Date.now()}`,
      festivalName: festival,
      title: title.trim(),
      category,
      timeAgo: 'Just now',
      description: description.trim() || 'Custom celebration note & preparation checklist.',
      hasReminder,
      reminder: hasReminder ? reminderTime : undefined,
      budget: budget.trim() ? `₹${budget.trim()} Budget` : undefined,
    });

    // Reset & close
    setTitle('');
    setDescription('');
    setBudget('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-md bg-[#fff8f5] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] border border-[#f2e6dd]">
        <div className="flex items-center justify-between pb-3 border-b border-[#f2e6dd]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbce] text-[#a33900] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
            </div>
            <h3 className="text-[17px] text-[#201a16] font-bold">New Celebration Note</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#ede0d8] flex items-center justify-center text-[#594139]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto py-3 flex flex-col gap-3.5 no-scrollbar">
          <div>
            <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
              Note Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mithai Orders, Diya procurement, Rangoli flowers"
              className="w-full h-10 px-3 rounded-xl bg-white border border-[#f2e6dd] text-[#201a16] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
                Festival
              </label>
              <select
                value={festival}
                onChange={(e) => setFestival(e.target.value)}
                className="w-full h-10 px-2.5 rounded-xl bg-white border border-[#f2e6dd] text-[#201a16] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
              >
                <option value="Diwali 2024">Diwali 2024</option>
                <option value="Govardhan Puja">Govardhan Puja</option>
                <option value="Bhai Dooj">Bhai Dooj</option>
                <option value="Chhath Puja">Chhath Puja</option>
                <option value="Dev Deepawali">Dev Deepawali</option>
                <option value="General Preparation">General</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 px-2.5 rounded-xl bg-white border border-[#f2e6dd] text-[#201a16] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
              >
                <option value="Shopping">Shopping</option>
                <option value="Rituals">Rituals</option>
                <option value="Guests">Guests</option>
                <option value="Gifts">Gifts</option>
                <option value="Catering">Catering</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
              Details &amp; Tasks
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="List quantities, vendors, family assignments, or timing notes..."
              className="w-full p-3 rounded-xl bg-white border border-[#f2e6dd] text-[#201a16] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
                Budget (Optional)
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 5,000"
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#f2e6dd] text-[#201a16] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#ca4b07]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#594139] uppercase tracking-wider block mb-1">
                Reminder Alert
              </label>
              <div className="flex items-center gap-2 h-10">
                <input
                  type="checkbox"
                  id="reminder-toggle"
                  checked={hasReminder}
                  onChange={(e) => setHasReminder(e.target.checked)}
                  className="w-4 h-4 accent-[#a33900] rounded"
                />
                <label htmlFor="reminder-toggle" className="text-[12px] text-[#201a16] cursor-pointer">
                  Set Muhurat reminder
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 mt-1 rounded-xl bg-[#a33900] hover:bg-[#ca4b07] text-white font-bold text-[13px] active:scale-98 transition-all shadow-md"
          >
            Save Note to Preparation List
          </button>
        </form>
      </div>
    </div>
  );
};
