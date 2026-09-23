import React, { useState } from 'react';

interface SamagriModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAllToNotes: (items: string[]) => void;
}

const DEFAULT_SAMAGRI = [
  { id: 's1', text: '51 Earthen Clay Diyas & pure Cow Ghee', category: 'Diyas' },
  { id: 's2', text: 'Fresh Pink Lotus flowers (Kamal ke phool) & Marigold garlands', category: 'Flowers' },
  { id: 's3', text: 'Silver Coins (Lakshmi-Ganesha imprinted)', category: 'Sacred' },
  { id: 's4', text: 'Roli, Kumkum, Chandan, Haldi, Akshat, and Janeu', category: 'Puja' },
  { id: 's5', text: 'Batasha sweets, puffed rice (Kheel), and Kaju Katli', category: 'Prasad' },
  { id: 's6', text: '5 whole Betel leaves (Paan), Supari, and Clove (Laung)', category: 'Offerings' },
  { id: 's7', text: 'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)', category: 'Abhishekam' },
  { id: 's8', text: 'Mango leaves (Aam ke patte) & Coconut for Kalash Sthapana', category: 'Kalash' },
];

export const SamagriModal: React.FC<SamagriModalProps> = ({ isOpen, onClose, onAddAllToNotes }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    s1: true,
    s2: true,
  });

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddAll = () => {
    const list = DEFAULT_SAMAGRI.map((s) => s.text);
    onAddAllToNotes(list);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-lg bg-[#fff8f5] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] border border-[#f2e6dd]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f2e6dd]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffdbce] text-[#a33900] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-[18px] text-[#201a16] font-bold">Lakshmi Puja Samagri List</h3>
              <p className="text-[12px] text-[#594139]">Complete traditional Vedic checklist</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#ede0d8] flex items-center justify-center text-[#594139]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto py-3 flex flex-col gap-2 no-scrollbar">
          {DEFAULT_SAMAGRI.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#f2e6dd] hover:bg-[#fef1e9] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#a33900] accent-[#a33900]"
                  />
                  <span
                    className={`text-[13px] ${
                      isChecked ? 'line-through text-[#594139] opacity-75' : 'text-[#201a16] font-medium'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f8ece3] text-[#594139] font-semibold">
                  {item.category}
                </span>
              </label>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-[#f2e6dd] flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAddAll}
            className="w-full h-11 rounded-xl bg-[#a33900] hover:bg-[#ca4b07] text-white font-bold text-[13px] flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">playlist_add</span>
            <span>Add All to My Notes Checklist</span>
          </button>
        </div>
      </div>
    </div>
  );
};
