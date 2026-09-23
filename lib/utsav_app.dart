import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme/app_colors.dart';
import 'core/theme/app_theme.dart';
import 'features/calendar/presentation/screens/calendar_screen.dart';
import 'features/calendar/presentation/state/calendar_provider.dart';
import 'features/festivals/data/datasources/festival_local_datasource.dart';
import 'features/festivals/presentation/screens/festivals_screen.dart';
import 'features/festivals/presentation/state/festivals_provider.dart';
import 'features/notes/presentation/screens/my_notes_screen.dart';
import 'features/notes/presentation/state/notes_provider.dart';
import 'features/profile/presentation/screens/profile_screen.dart';

class UtsavAppRoot extends StatelessWidget {
  const UtsavAppRoot({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => FestivalsProvider(FestivalLocalDataSource()),
        ),
        ChangeNotifierProvider(
          create: (_) => CalendarProvider(),
        ),
        ChangeNotifierProvider(
          create: (_) => NotesProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'Utsav',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const UtsavShell(),
      ),
    );
  }
}

class UtsavShell extends StatefulWidget {
  const UtsavShell({super.key});

  @override
  State<UtsavShell> createState() => _UtsavShellState();
}

class _UtsavShellState extends State<UtsavShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    FestivalsScreen(),
    CalendarScreen(),
    MyNotesScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.surface.withOpacity(0.95),
          boxShadow: [
            BoxShadow(
              color: Colors.brown.withOpacity(0.08),
              blurRadius: 16,
              offset: const Offset(0, -3),
            ),
          ],
        ),
        child: SafeArea(
          child: NavigationBar(
            selectedIndex: _currentIndex,
            onDestinationSelected: (index) => setState(() => _currentIndex = index),
            backgroundColor: Colors.transparent,
            elevation: 0,
            indicatorColor: AppColors.primaryFixed,
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.celebration_outlined),
                selectedIcon: Icon(Icons.celebration, color: AppColors.primary),
                label: 'Festivals',
              ),
              NavigationDestination(
                icon: Icon(Icons.calendar_month_outlined),
                selectedIcon: Icon(Icons.calendar_month, color: AppColors.primary),
                label: 'Calendar',
              ),
              NavigationDestination(
                icon: Icon(Icons.checklist_outlined),
                selectedIcon: Icon(Icons.checklist, color: AppColors.primary),
                label: 'My Notes',
              ),
              NavigationDestination(
                icon: Icon(Icons.person_outline),
                selectedIcon: Icon(Icons.person, color: AppColors.primary),
                label: 'Profile',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
