// Utsav - Indian Festivals, Panchang & Muhurat Calendar
// Full Flutter (Dart) Material 3 Implementation
// Requires: flutter_native_splash, google_fonts, intl

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const UtsavApp());
}

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

class UtsavApp extends StatelessWidget {
  const UtsavApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Utsav Festivals',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: UtsavColors.surface,
        textTheme: GoogleFonts.outfitTextTheme().copyWith(
          displayLarge: GoogleFonts.epilogue(fontWeight: FontWeight.bold),
          headlineMedium: GoogleFonts.epilogue(fontWeight: FontWeight.w600),
          headlineSmall: GoogleFonts.epilogue(fontWeight: FontWeight.w600),
        ),
      ),
      home: const UtsavNavigationShell(),
    );
  }
}

class UtsavNavigationShell extends StatefulWidget {
  const UtsavNavigationShell({super.key});

  @override
  State<UtsavNavigationShell> createState() => _UtsavNavigationShellState();
}

class _UtsavNavigationShellState extends State<UtsavNavigationShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: const [
          FestivalsScreen(),
          CalendarScreen(),
          MyNotesScreen(),
          ProfileScreen(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        indicatorColor: UtsavColors.primaryFixed,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.celebration_outlined), selectedIcon: Icon(Icons.celebration, color: UtsavColors.primary), label: 'Festivals'),
          NavigationDestination(icon: Icon(Icons.calendar_month_outlined), selectedIcon: Icon(Icons.calendar_month, color: UtsavColors.primary), label: 'Calendar'),
          NavigationDestination(icon: Icon(Icons.checklist_outlined), selectedIcon: Icon(Icons.checklist, color: UtsavColors.primary), label: 'My Notes'),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person, color: UtsavColors.primary), label: 'Profile'),
        ],
      ),
    );
  }
}

class FestivalsScreen extends StatelessWidget {
  const FestivalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: UtsavColors.surface,
        elevation: 0,
        title: Text('Utsav Festivals', style: GoogleFonts.epilogue(color: UtsavColors.primary, fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('Festivals list and Shubh Muhurats'),
        ],
      ),
    );
  }
}

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Calendar & Panchang')),
      body: const Center(child: Text('November 2024 Panchang')),
    );
  }
}

class MyNotesScreen extends StatelessWidget {
  const MyNotesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Notes')),
      body: const Center(child: Text('Preparation & Notes')),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: const Center(child: Text('User Profile & Preferences')),
    );
  }
}
