import React from 'react';

interface ProfileTabProps {
  onOpenFlutterCode: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onOpenFlutterCode, onShowToast }) => {
  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-4 gap-5 animate-fadeIn">
      {/* Profile Card */}
      <div className="flex flex-col items-center text-center bg-white rounded-3xl p-6 shadow-xs border border-[#f2e6dd]">
        <div className="relative">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1U6ZYouUkTtjJaSMbvBK2PU7yGdGpoaaqvHlcHaMOd4t-ObZrRkw6aflPGE8Fq2T35SLMtTo--17BWqYePDFC-a_kdXNCLLcnDko1-naI2kc-FbMqCkZpd3HFCDysp09Y9_7WVGleohiDUPUK75ysl6UJf0n5mnZ3B3f5YdNOU0qAotH9-g3QrJgvOvYNa4hewxhh8_MGOPhq0lq5WEv2cBsePpiuBwDsuRPRLNTNx_nBYHeXTAtED03js"
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-[#ffdbce]"
          />
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#20656b] rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px]">
            ✓
          </span>
        </div>
        <h2 className="text-[20px] text-[#201a16] font-bold mt-3">Namrata Chavan</h2>
        <p className="text-[13px] text-[#594139]">namrata.chavan161197@gmail.com</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#f8ece3] text-[#a33900] text-[11px] font-bold">
            Vikram Samvat 2081
          </span>
          <span className="px-3 py-1 rounded-full bg-[#ffdbce] text-[#370e00] text-[11px] font-bold">
            Kartik Maas Active
          </span>
        </div>
      </div>

      {/* Developer & Architecture Quick Access */}
      <div className="bg-gradient-to-r from-[#a33900] to-[#ca4b07] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">flutter</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold">Flutter (Dart) Code</span>
            <span className="text-[11px] text-white/80">
              View and copy Flutter Material 3 code
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenFlutterCode}
          className="px-3.5 py-1.5 rounded-xl bg-white text-[#a33900] text-[12px] font-bold hover:bg-[#f8ece3] active:scale-95 transition-all shadow-xs"
        >
          View Code
        </button>
      </div>

      {/* Settings & Preferences List */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-[#f2e6dd] divide-y divide-[#f8ece3]">
        <div
          onClick={() => onShowToast('Location changed to New Delhi (IST)')}
          className="flex items-center justify-between p-3.5 hover:bg-[#fef1e9] rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbce] text-[#a33900] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#201a16]">Panchang Location</span>
              <span className="text-[12px] text-[#594139]">New Delhi (IST UTC+5:30)</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#594139] text-[20px]">chevron_right</span>
        </div>

        <div
          onClick={() => onShowToast('Alarms configured for all Mahaparvs')}
          className="flex items-center justify-between p-3.5 hover:bg-[#fef1e9] rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#adeef4] text-[#20656b] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#201a16]">Muhurat Alarms &amp; Notifications</span>
              <span className="text-[12px] text-[#594139]">30 mins before Pradosh Kaal</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#594139] text-[20px]">chevron_right</span>
        </div>

        <div
          onClick={() => onShowToast('Drik Ganita calculation method active')}
          className="flex items-center justify-between p-3.5 hover:bg-[#fef1e9] rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffdad8] text-[#b12a33] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#201a16]">Calculation Standard</span>
              <span className="text-[12px] text-[#594139]">Drik Panchang (Ayanamsha: Lahiri)</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#594139] text-[20px]">chevron_right</span>
        </div>

        <div
          onClick={() => onShowToast('Offline cached festivals sync up to date')}
          className="flex items-center justify-between p-3.5 hover:bg-[#fef1e9] rounded-xl cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f2e6dd] text-[#594139] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">cloud_done</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#201a16]">Offline Panchang Storage</span>
              <span className="text-[12px] text-[#594139]">2024–2025 Maas cached</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#594139] text-[20px]">chevron_right</span>
        </div>
      </div>
    </div>
  );
};
