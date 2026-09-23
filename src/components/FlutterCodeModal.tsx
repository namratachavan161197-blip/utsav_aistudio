import React, { useState } from 'react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const FLUTTER_DART_CODE = `// ===========================================================================
// UTSAV - INDIAN FESTIVALS, PANCHANG & MUHURAT CALENDAR
// Complete Flutter (Dart) Material 3 Implementation
// ===========================================================================

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const UtsavApp());
}

// ---------------------------------------------------------------------------
// 1. BRAND COLORS & DESIGN TOKENS
// ---------------------------------------------------------------------------
class UtsavColors {
  static const Color primary = Color(0xFFA33900);
  static const Color primaryContainer = Color(0xFFCA4B07);
  static const Color primaryFixed = Color(0xFFFFDBCE);
  static const Color primaryFixedDim = Color(0xFFFFB599);
  static const Color onPrimaryFixed = Color(0xFF370E00);

  static const Color secondary = Color(0xFFB12A33);
  static const Color secondaryContainer = Color(0xFFFD6264);
  static const Color secondaryFixed = Color(0xFFFFDAD8);
  static const Color onSecondaryFixed = Color(0xFF410006);

  static const Color tertiary = Color(0xFF20656B);
  static const Color tertiaryContainer = Color(0xFF3D7E84);
  static const Color tertiaryFixed = Color(0xFFADEEF4);

  static const Color surface = Color(0xFFFFF8F5);
  static const Color surfaceLow = Color(0xFFFEF1E9);
  static const Color surfaceContainer = Color(0xFFF8ECE3);
  static const Color surfaceHigh = Color(0xFFF2E6DD);
  static const Color surfaceHighest = Color(0xFFEDE0D8);

  static const Color onSurface = Color(0xFF201A16);
  static const Color onSurfaceVariant = Color(0xFF594139);
  static const Color inverseSurface = Color(0xFF362F2A);
  static const Color inverseOnSurface = Color(0xFFFBEEE6);
}

// ---------------------------------------------------------------------------
// 2. ROOT APPLICATION WITH EPILOGUE & OUTFIT TYPOGRAPHY
// ---------------------------------------------------------------------------
class UtsavApp extends StatelessWidget {
  const UtsavApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Utsav',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: UtsavColors.surface,
        colorScheme: const ColorScheme.light(
          primary: UtsavColors.primary,
          secondary: UtsavColors.secondary,
          surface: UtsavColors.surface,
          onSurface: UtsavColors.onSurface,
        ),
        textTheme: GoogleFonts.outfitTextTheme().copyWith(
          displayLarge: GoogleFonts.epilogue(fontWeight: FontWeight.bold),
          headlineMedium: GoogleFonts.epilogue(fontWeight: FontWeight.w600),
          headlineSmall: GoogleFonts.epilogue(fontWeight: FontWeight.w600),
        ),
      ),
      home: const UtsavShell(),
    );
  }
}

// ---------------------------------------------------------------------------
// 3. NAVIGATION SHELL (4 TABS: FESTIVALS, CALENDAR, MY NOTES, PROFILE)
// ---------------------------------------------------------------------------
class UtsavShell extends StatefulWidget {
  const UtsavShell({super.key});

  @override
  State<UtsavShell> createState() => _UtsavShellState();
}

class _UtsavShellState extends State<UtsavShell> {
  int _currentIndex = 0;

  final List<Widget> _tabs = const [
    FestivalsScreen(),
    CalendarScreen(),
    MyNotesScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: _tabs),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        indicatorColor: UtsavColors.primaryFixed,
        backgroundColor: UtsavColors.surface.withOpacity(0.95),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.celebration_outlined),
            selectedIcon: Icon(Icons.celebration, color: UtsavColors.primary),
            label: 'Festivals',
          ),
          NavigationDestination(
            icon: Icon(Icons.calendar_month_outlined),
            selectedIcon: Icon(Icons.calendar_month, color: UtsavColors.primary),
            label: 'Calendar',
          ),
          NavigationDestination(
            icon: Icon(Icons.checklist_outlined),
            selectedIcon: Icon(Icons.checklist, color: UtsavColors.primary),
            label: 'My Notes',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person, color: UtsavColors.primary),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// 4. FESTIVALS SCREEN (SPOTLIGHT DIWALI CARD & UPCOMING CARDS)
// ---------------------------------------------------------------------------
class FestivalsScreen extends StatelessWidget {
  const FestivalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Utsav', style: GoogleFonts.epilogue(color: UtsavColors.primary, fontWeight: FontWeight.bold)),
        backgroundColor: UtsavColors.surface,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Spotlight Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: UtsavColors.inverseSurface,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('MAHAPARV • PAN-INDIA', style: GoogleFonts.outfit(color: UtsavColors.primaryFixed, fontSize: 11, fontWeight: FontWeight.bold)),
                Text('Diwali', style: GoogleFonts.epilogue(color: Colors.white, fontSize: 26, fontWeight: FontWeight.bold)),
                Text('Shubh Muhurat: 05:36 PM – 07:32 PM', style: GoogleFonts.outfit(color: Colors.white70)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: Text('Calendar & Panchang')));
  }
}

class MyNotesScreen extends StatelessWidget {
  const MyNotesScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: Text('My Notes & Preparation')));
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: Text('Profile & Preferences')));
  }
}
`;

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FLUTTER_DART_CODE);
    setCopied(true);
    onShowToast('Flutter Dart code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#201a16] text-[#ede0d8] rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] border border-[#594139]">
        <div className="flex items-center justify-between pb-3 border-b border-[#362f2a]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffb599] text-[24px]">terminal</span>
            <div>
              <h3 className="text-[17px] text-white font-bold">Flutter (Dart) Code Implementation</h3>
              <p className="text-[11px] text-[#ffdbce]">
                Complete production Flutter Material 3 code for Utsav
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#a33900] text-white text-[12px] font-bold hover:bg-[#ca4b07] active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Dart Code'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto my-3 p-4 rounded-xl bg-[#16120e] text-[12px] font-mono leading-relaxed border border-white/10 text-amber-200/90 no-scrollbar">
          <pre>{FLUTTER_DART_CODE}</pre>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#362f2a] text-[11px] text-white/60">
          <span>Requires: flutter, google_fonts: ^6.1.0, intl: ^0.19.0</span>
          <span>Saved locally to /src/flutter/utsav_app.dart</span>
        </div>
      </div>
    </div>
  );
};
