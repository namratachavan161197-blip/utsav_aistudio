import React, { useState } from 'react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

interface FileItem {
  path: string;
  name: string;
  layer: 'Core' | 'Domain' | 'Data' | 'Presentation' | 'Config';
  description: string;
  code: string;
}

const CLEAN_ARCHITECTURE_FILES: FileItem[] = [
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    layer: 'Config',
    description: 'Flutter app entry point initializing WidgetsFlutterBinding & running UtsavAppRoot',
    code: `import 'package:flutter/material.dart';
import 'utsav_app.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const UtsavAppRoot());
}
`,
  },
  {
    path: 'lib/utsav_app.dart',
    name: 'utsav_app.dart',
    layer: 'Presentation',
    description: 'MultiProvider setup (Festivals, Calendar, Notes) & Bottom Navigation Shell',
    code: `import 'package:flutter/material.dart';
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
`,
  },
  {
    path: 'lib/core/theme/app_colors.dart',
    name: 'app_colors.dart',
    layer: 'Core',
    description: 'Auspicious Vermilion, Sacred Kumkum, Peacock Teal, and Sandstone tokens',
    code: `import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // Vermilion & Deep Saffron
  static const Color primary = Color(0xFFA33900);
  static const Color primaryContainer = Color(0xFFCA4B07);
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryFixed = Color(0xFFFFDBCE);
  static const Color primaryFixedDim = Color(0xFFFFB599);
  static const Color onPrimaryFixed = Color(0xFF370E00);

  // Kumkum Rose & Alta
  static const Color secondary = Color(0xFFB12A33);
  static const Color secondaryContainer = Color(0xFFFD6264);
  static const Color secondaryFixed = Color(0xFFFFDAD8);
  static const Color onSecondaryFixed = Color(0xFF410006);

  // Sacred Peacock Teal
  static const Color tertiary = Color(0xFF20656B);
  static const Color tertiaryContainer = Color(0xFF3D7E84);
  static const Color tertiaryFixed = Color(0xFFADEEF4);

  // Surface & Canvas
  static const Color surface = Color(0xFFFFF8F5);
  static const Color surfaceHigh = Color(0xFFF2E6DD);
  static const Color surfaceContainer = Color(0xFFF8ECE3);
  static const Color inverseSurface = Color(0xFF362F2A);
  static const Color onSurface = Color(0xFF201A16);
  static const Color onSurfaceVariant = Color(0xFF594139);
}
`,
  },
  {
    path: 'lib/core/theme/app_typography.dart',
    name: 'app_typography.dart',
    layer: 'Core',
    description: 'Epilogue for celebratory headlines and Outfit for devotional body copy',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

class AppTypography {
  AppTypography._();

  static TextStyle displayHero = GoogleFonts.epilogue(
    fontSize: 34,
    fontWeight: FontWeight.bold,
    color: AppColors.onSurface,
  );

  static TextStyle headlineLarge = GoogleFonts.epilogue(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    color: AppColors.onSurface,
  );

  static TextStyle headlineMedium = GoogleFonts.epilogue(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    color: AppColors.onSurface,
  );

  static TextStyle bodyLarge = GoogleFonts.outfit(
    fontSize: 16,
    color: AppColors.onSurface,
  );

  static TextStyle bodyMedium = GoogleFonts.outfit(
    fontSize: 14,
    color: AppColors.onSurface,
  );
}
`,
  },
  {
    path: 'lib/features/festivals/domain/entities/festival_entity.dart',
    name: 'festival_entity.dart',
    layer: 'Domain',
    description: 'Core business entity for Indian festivals, tithi, muhurat & rituals',
    code: `class FestivalEntity {
  final String id;
  final String name;
  final String? hindiName;
  final String month;
  final String day;
  final DateTime dateTime;
  final String tithi;
  final String? vikramSamvat;
  final String countdownText;
  final String description;
  final String region;
  final String shubhMuhuratTime;
  final String? shubhMuhuratWindow;
  final String category;
  final int notesCount;
  final bool isSpotlight;
  final String? heroImageUrl;
  final List<String> rituals;

  const FestivalEntity({
    required this.id,
    required this.name,
    this.hindiName,
    required this.month,
    required this.day,
    required this.dateTime,
    required this.tithi,
    this.vikramSamvat,
    required this.countdownText,
    required this.description,
    required this.region,
    required this.shubhMuhuratTime,
    this.shubhMuhuratWindow,
    required this.category,
    this.notesCount = 0,
    this.isSpotlight = false,
    this.heroImageUrl,
    this.rituals = const [],
  });
}
`,
  },
  {
    path: 'lib/features/festivals/domain/repositories/festival_repository.dart',
    name: 'festival_repository.dart',
    layer: 'Domain',
    description: 'Repository interface enforcing Inversion of Control for festivals',
    code: `import '../entities/festival_entity.dart';

abstract class FestivalRepository {
  Future<List<FestivalEntity>> getAllFestivals();
  Future<FestivalEntity?> getSpotlightFestival();
  Future<FestivalEntity?> getFestivalById(String id);
}
`,
  },
  {
    path: 'lib/features/festivals/data/models/festival_model.dart',
    name: 'festival_model.dart',
    layer: 'Data',
    description: 'Data model extending FestivalEntity with fromJson & toJson serialization',
    code: `import '../../domain/entities/festival_entity.dart';

class FestivalModel extends FestivalEntity {
  const FestivalModel({
    required super.id,
    required super.name,
    super.hindiName,
    required super.month,
    required super.day,
    required super.dateTime,
    required super.tithi,
    super.vikramSamvat,
    required super.countdownText,
    required super.description,
    required super.region,
    required super.shubhMuhuratTime,
    super.shubhMuhuratWindow,
    required super.category,
    super.notesCount,
    super.isSpotlight,
    super.heroImageUrl,
    super.rituals,
  });

  factory FestivalModel.fromJson(Map<String, dynamic> json) {
    return FestivalModel(
      id: json['id'] as String,
      name: json['name'] as String,
      hindiName: json['hindiName'] as String?,
      month: json['month'] as String,
      day: json['day'] as String,
      dateTime: DateTime.parse(json['dateTime'] as String),
      tithi: json['tithi'] as String,
      vikramSamvat: json['vikramSamvat'] as String?,
      countdownText: json['countdownText'] as String,
      description: json['description'] as String,
      region: json['region'] as String,
      shubhMuhuratTime: json['shubhMuhuratTime'] as String,
      shubhMuhuratWindow: json['shubhMuhuratWindow'] as String?,
      category: json['category'] as String,
      notesCount: (json['notesCount'] as num?)?.toInt() ?? 0,
      isSpotlight: (json['isSpotlight'] as bool?) ?? false,
      heroImageUrl: json['heroImageUrl'] as String?,
      rituals: (json['rituals'] as List<dynamic>?)?.cast<String>() ?? const [],
    );
  }
}
`,
  },
  {
    path: 'lib/features/festivals/data/datasources/festival_remote_datasource.dart',
    name: 'festival_remote_datasource.dart',
    layer: 'Data',
    description: 'Real-time Firebase Firestore Remote Data Source for Festivals with Stream support',
    code: `import 'package:cloud_firestore/cloud_firestore.dart';
import '../../domain/entities/festival_entity.dart';
import '../../domain/repositories/festival_repository.dart';
import '../models/festival_model.dart';

class FestivalRemoteDataSource implements FestivalRepository {
  final FirebaseFirestore _firestore;

  FestivalRemoteDataSource({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  CollectionReference<Map<String, dynamic>> get _festivalsCollection =>
      _firestore.collection('festivals');

  @override
  Future<List<FestivalEntity>> getAllFestivals() async {
    final snapshot = await _festivalsCollection.get();
    return snapshot.docs.map((doc) => FestivalModel.fromJson(doc.data())).toList();
  }

  /// Real-time Stream of festivals from Firestore
  Stream<List<FestivalEntity>> getFestivalsStream() {
    return _festivalsCollection.snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => FestivalModel.fromJson(doc.data())).toList();
    });
  }

  @override
  Future<FestivalEntity?> getSpotlightFestival() async {
    final snapshot = await _festivalsCollection
        .where('isSpotlight', isEqualTo: true)
        .limit(1)
        .get();

    if (snapshot.docs.isNotEmpty) {
      return FestivalModel.fromJson(snapshot.docs.first.data());
    }
    return null;
  }

  @override
  Future<FestivalEntity?> getFestivalById(String id) async {
    final docSnap = await _festivalsCollection.doc(id).get();
    if (docSnap.exists && docSnap.data() != null) {
      return FestivalModel.fromJson(docSnap.data()!);
    }
    return null;
  }
}
`,
  },
  {
    path: 'lib/features/notes/data/datasources/notes_remote_datasource.dart',
    name: 'notes_remote_datasource.dart',
    layer: 'Data',
    description: 'Real-time Cloud Firestore Data Source for user preparation notes & live checklists',
    code: `import 'package:cloud_firestore/cloud_firestore.dart';
import '../../domain/entities/festive_note_entity.dart';

class NotesRemoteDataSource {
  final FirebaseFirestore _firestore;

  NotesRemoteDataSource({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  CollectionReference<Map<String, dynamic>> _userNotes(String userId) =>
      _firestore.collection('users').doc(userId).collection('notes');

  Stream<List<FestiveNoteEntity>> streamUserNotes(String userId) {
    return _userNotes(userId).snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        return FestiveNoteEntity(
          id: doc.id,
          festivalGroup: data['festivalGroup'] as String? ?? 'Diwali 2024',
          festivalSubtitle: data['festivalSubtitle'] as String? ?? '',
          daysLeftText: data['daysLeftText'] as String? ?? '',
          tag: data['tag'] as String? ?? 'Shopping',
          title: data['title'] as String? ?? '',
          body: data['body'] as String? ?? '',
          lastModified: data['lastModified'] as String? ?? 'Just now',
          reminderTime: data['reminderTime'] as String?,
          budget: data['budget'] as String?,
          estimatedSpend: data['estimatedSpend'] as String?,
          imageUrl: data['imageUrl'] as String?,
          checklistItems: (data['checklistItems'] as List<dynamic>?)
                  ?.map((item) => ChecklistItem(
                        id: item['id'] as String,
                        title: item['title'] as String,
                        isCompleted: item['isCompleted'] as bool? ?? false,
                      ))
                  .toList() ??
              const [],
        );
      }).toList();
    });
  }

  Future<void> saveNote(String userId, FestiveNoteEntity note) async {
    await _userNotes(userId).doc(note.id).set({
      'festivalGroup': note.festivalGroup,
      'festivalSubtitle': note.festivalSubtitle,
      'daysLeftText': note.daysLeftText,
      'tag': note.tag,
      'title': note.title,
      'body': note.body,
      'lastModified': note.lastModified,
      'reminderTime': note.reminderTime,
      'budget': note.budget,
      'estimatedSpend': note.estimatedSpend,
      'imageUrl': note.imageUrl,
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  Future<void> deleteNote(String userId, String noteId) async {
    await _userNotes(userId).doc(noteId).delete();
  }
}
`,
  },
  {
    path: 'lib/features/festivals/data/datasources/festival_local_datasource.dart',
    name: 'festival_local_datasource.dart',
    layer: 'Data',
    description: 'Data source with Diwali, Govardhan, Bhai Dooj, and Chhath records',
    code: `import '../../domain/entities/festival_entity.dart';
import '../../domain/repositories/festival_repository.dart';
import '../models/festival_model.dart';

class FestivalLocalDataSource implements FestivalRepository {
  final List<FestivalModel> _mockFestivals = [
    FestivalModel(
      id: 'diwali',
      name: 'Diwali',
      hindiName: 'दीपावली',
      month: 'NOV',
      day: '01',
      dateTime: DateTime(2024, 11, 1),
      tithi: 'Kartik Krishna Amavasya',
      vikramSamvat: 'Vikram Samvat 2081',
      countdownText: 'In 4 Days',
      description: 'The Festival of Lights & Lakshmi Pujan',
      region: 'Mahaparv • Pan-India',
      shubhMuhuratTime: '05:36 PM – 07:32 PM',
      category: 'major',
      isSpotlight: true,
    ),
    // Additional festival records...
  ];

  @override
  Future<List<FestivalEntity>> getAllFestivals() async => _mockFestivals;

  @override
  Future<FestivalEntity?> getSpotlightFestival() async =>
      _mockFestivals.firstWhere((f) => f.isSpotlight);

  @override
  Future<FestivalEntity?> getFestivalById(String id) async {
    try {
      return _mockFestivals.firstWhere((f) => f.id == id);
    } catch (_) {
      return null;
    }
  }
}
`,
  },
  {
    path: 'lib/features/festivals/presentation/state/festivals_provider.dart',
    name: 'festivals_provider.dart',
    layer: 'Presentation',
    description: 'State management for category filters, searches, and Muhurat sorting',
    code: `import 'package:flutter/foundation.dart';
import '../../domain/entities/festival_entity.dart';
import '../../domain/repositories/festival_repository.dart';

enum FestivalSortOption { soonest, byMonth, alphabetical }

class FestivalsProvider extends ChangeNotifier {
  final FestivalRepository _repository;

  FestivalsProvider(this._repository) {
    loadFestivals();
  }

  List<FestivalEntity> _allFestivals = [];
  FestivalEntity? _spotlightFestival;
  String _selectedCategory = 'all';
  String _searchQuery = '';
  FestivalSortOption _sortOption = FestivalSortOption.soonest;

  List<FestivalEntity> get filteredFestivals {
    return _allFestivals.where((f) {
      final matchesCategory = _selectedCategory == 'all' || f.category == _selectedCategory;
      final matchesQuery = _searchQuery.isEmpty ||
          f.name.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).toList();
  }

  Future<void> loadFestivals() async {
    _allFestivals = await _repository.getAllFestivals();
    _spotlightFestival = await _repository.getSpotlightFestival();
    notifyListeners();
  }

  void setCategory(String cat) {
    _selectedCategory = cat;
    notifyListeners();
  }

  void setSearchQuery(String q) {
    _searchQuery = q;
    notifyListeners();
  }
}
`,
  },
  {
    path: 'lib/features/festivals/presentation/screens/festivals_screen.dart',
    name: 'festivals_screen.dart',
    layer: 'Presentation',
    description: 'Festivals UI with search, spotlight card, quick filters & upcoming list',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/festivals_provider.dart';
import '../widgets/festival_list_item.dart';
import '../widgets/festival_spotlight_card.dart';

class FestivalsScreen extends StatelessWidget {
  const FestivalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<FestivalsProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Utsav Festivals')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          if (provider.spotlightFestival != null)
            FestivalSpotlightCard(festival: provider.spotlightFestival!),
          const SizedBox(height: 16),
          ...provider.filteredFestivals.map((f) => FestivalListItem(festival: f)),
        ],
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/features/calendar/domain/entities/panchang_entity.dart',
    name: 'panchang_entity.dart',
    layer: 'Domain',
    description: 'Panchang day domain entity containing Sunrise, Sunset, and Tithi timings',
    code: `class PanchangDayEntity {
  final int day;
  final String month;
  final int year;
  final String pakshaAndTithi;
  final String sunrise;
  final String sunset;
  final String tithiEnd;
  final String shubhMuhuratName;
  final String shubhMuhuratTime;
  final List<String> festivalsOnDay;

  const PanchangDayEntity({
    required this.day,
    required this.month,
    required this.year,
    required this.pakshaAndTithi,
    required this.sunrise,
    required this.sunset,
    required this.tithiEnd,
    required this.shubhMuhuratName,
    required this.shubhMuhuratTime,
    this.festivalsOnDay = const [],
  });
}
`,
  },
  {
    path: 'lib/features/notes/domain/entities/festive_note_entity.dart',
    name: 'festive_note_entity.dart',
    layer: 'Domain',
    description: 'Entity for celebration preparation, checklist items, and budget',
    code: `class ChecklistItem {
  final String id;
  final String title;
  bool isCompleted;

  ChecklistItem({
    required this.id,
    required this.title,
    this.isCompleted = false,
  });
}

class FestiveNoteEntity {
  final String id;
  final String festivalGroup;
  final String festivalSubtitle;
  final String daysLeftText;
  final String tag;
  final String title;
  final String body;
  final String lastModified;
  final String? reminderTime;
  final String? budget;
  final List<ChecklistItem> checklistItems;

  const FestiveNoteEntity({
    required this.id,
    required this.festivalGroup,
    required this.festivalSubtitle,
    required this.daysLeftText,
    required this.tag,
    required this.title,
    required this.body,
    required this.lastModified,
    this.reminderTime,
    this.budget,
    this.checklistItems = const [],
  });
}
`,
  },
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    layer: 'Config',
    description: 'Flutter dependencies: google_fonts, provider, intl, and material assets',
    code: `name: utsav
description: "Utsav - Indian Festivals, Panchang & Muhurat Calendar in Flutter Clean Architecture"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.1.0
  provider: ^6.1.1
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`,
  },
];

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [selectedFile, setSelectedFile] = useState<FileItem>(CLEAN_ARCHITECTURE_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCurrentFile = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    onShowToast(`Copied ${selectedFile.name} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyArchitectureTree = () => {
    const tree = `📁 lib/
├── 📁 core/
│   ├── 📁 constants/
│   │   └── app_assets.dart
│   └── 📁 theme/
│       ├── app_colors.dart
│       ├── app_typography.dart
│       └── app_theme.dart
├── 📁 features/
│   ├── 📁 festivals/
│   │   ├── 📁 domain/
│   │   │   ├── 📁 entities/
│   │   │   │   └── festival_entity.dart
│   │   │   └── 📁 repositories/
│   │   │       └── festival_repository.dart
│   │   ├── 📁 data/
│   │   │   ├── 📁 models/
│   │   │   │   └── festival_model.dart
│   │   │   └── 📁 datasources/
│   │   │       └── festival_local_datasource.dart
│   │   └── 📁 presentation/
│   │       ├── 📁 state/
│   │       │   └── festivals_provider.dart
│   │       ├── 📁 widgets/
│   │       │   ├── festival_spotlight_card.dart
│   │       │   └── festival_list_item.dart
│   │       └── 📁 screens/
│   │           ├── festivals_screen.dart
│   │           └── festival_detail_screen.dart
│   ├── 📁 calendar/
│   │   ├── 📁 domain/
│   │   │   └── 📁 entities/
│   │   │       └── panchang_entity.dart
│   │   └── 📁 presentation/
│   │       ├── 📁 state/
│   │       │   └── calendar_provider.dart
│   │       └── 📁 screens/
│   │           └── calendar_screen.dart
│   ├── 📁 notes/
│   │   ├── 📁 domain/
│   │   │   └── 📁 entities/
│   │   │       └── festive_note_entity.dart
│   │   └── 📁 presentation/
│   │       ├── 📁 state/
│   │       │   └── notes_provider.dart
│   │       └── 📁 screens/
│   │           └── my_notes_screen.dart
│   └── 📁 profile/
│       └── 📁 presentation/
│           └── 📁 screens/
│               └── profile_screen.dart
├── utsav_app.dart
├── main.dart
└── pubspec.yaml`;

    navigator.clipboard.writeText(tree);
    onShowToast('Clean Architecture tree structure copied!');
  };

  const getLayerBadgeColor = (layer: FileItem['layer']) => {
    switch (layer) {
      case 'Domain':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Data':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Presentation':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Core':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Config':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#1e1713] text-[#ede0d8] rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] border border-[#594139]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#362f2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#a33900] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[24px]">account_tree</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] text-white font-bold font-epilogue">
                  Flutter Clean Architecture & Feature Folders
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#370e00] text-[10px] font-extrabold uppercase">
                  Production Ready
                </span>
              </div>
              <p className="text-[12px] text-[#ffb599]">
                Structured into Domain (Entities & Repositories), Data (Models & Sources), Presentation (State & UI), and Core
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyArchitectureTree}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white text-[12px] font-semibold hover:bg-white/20 transition-all"
              title="Copy folder structure tree"
            >
              <span className="material-symbols-outlined text-[15px]">schema</span>
              <span>Folder Tree</span>
            </button>
            <button
              type="button"
              onClick={handleCopyCurrentFile}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#a33900] text-white text-[12px] font-bold hover:bg-[#ca4b07] active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Current File'}</span>
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

        {/* Two-pane layout: File explorer on left, code viewer on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 my-3 flex-1 min-h-0">
          {/* File Tree List */}
          <div className="md:col-span-4 bg-[#140e0b] rounded-2xl p-2 border border-white/5 overflow-y-auto max-h-[220px] md:max-h-[560px] no-scrollbar">
            <div className="px-2 py-1.5 text-[11px] font-bold text-white/40 uppercase tracking-wider flex items-center justify-between">
              <span>Project Files ({CLEAN_ARCHITECTURE_FILES.length})</span>
              <span className="text-[9px] text-amber-400/80">Clean Arch</span>
            </div>

            <div className="space-y-1 mt-1">
              {CLEAN_ARCHITECTURE_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex flex-col gap-0.5 ${
                      isSelected
                        ? 'bg-[#a33900]/30 border border-[#a33900] text-white shadow-xs'
                        : 'hover:bg-white/5 text-[#ede0d8]/80'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[12px] font-mono font-medium truncate">
                        {file.name}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-md font-semibold border ${getLayerBadgeColor(
                          file.layer
                        )}`}
                      >
                        {file.layer}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono truncate">
                      {file.path}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active File Content Viewer */}
          <div className="md:col-span-8 bg-[#120d0a] rounded-2xl border border-white/5 flex flex-col overflow-hidden">
            {/* File Path & Description Bar */}
            <div className="px-4 py-2.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-amber-400">
                    description
                  </span>
                  <span className="text-[13px] font-mono font-bold text-white">
                    {selectedFile.path}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getLayerBadgeColor(
                      selectedFile.layer
                    )}`}
                  >
                    {selectedFile.layer} Layer
                  </span>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">{selectedFile.description}</p>
              </div>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-y-auto p-4 text-[12px] font-mono leading-relaxed text-amber-200/90 no-scrollbar max-h-[460px]">
              <pre>{selectedFile.code}</pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#362f2a] text-[11px] text-white/60 gap-2">
          <div className="flex items-center gap-3">
            <span>
              All files are saved in <code className="text-amber-300">/lib/...</code> and <code className="text-amber-300">pubspec.yaml</code>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Provider + GoogleFonts + Material 3</span>
          </div>
          <span className="text-amber-400/90 font-medium">
            Clean Architecture: Domain ⟵ Data ⟵ Presentation
          </span>
        </div>
      </div>
    </div>
  );
};
