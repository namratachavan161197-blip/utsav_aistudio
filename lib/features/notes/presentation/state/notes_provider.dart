import 'package:flutter/foundation.dart';
import '../../../../core/constants/app_assets.dart';
import '../../domain/entities/festive_note_entity.dart';

class NotesProvider extends ChangeNotifier {
  String _selectedCategory = 'All';
  String _searchQuery = '';

  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;

  final List<FestiveNoteEntity> _notes = [
    FestiveNoteEntity(
      id: 'note_1',
      festivalGroup: 'Diwali 2024',
      festivalSubtitle: 'Lakshmi Puja • Friday, Nov 1',
      daysLeftText: 'In 4 days',
      tag: 'Shopping',
      title: 'Puja Samagri & Diyas',
      body: 'Procure pure brass diyas (51 count), organic rolled wicks, cow ghee, rose petals, lotus blooms, and marigold strings for main entryway toran.',
      lastModified: '2 hrs ago',
      reminderTime: 'Thu, 10 AM',
      imageUrl: AppAssets.thaliReference,
      checklistItems: [
        ChecklistItem(id: 'c1', title: '51 brass diyas', isCompleted: true),
        ChecklistItem(id: 'c2', title: 'Cow ghee 1kg', isCompleted: true),
        ChecklistItem(id: 'c3', title: 'Lotus flowers', isCompleted: true),
        ChecklistItem(id: 'c4', title: 'Marigold toran', isCompleted: true),
        ChecklistItem(id: 'c5', title: 'Roli and Akshat', isCompleted: true),
        ChecklistItem(id: 'c6', title: 'Silver coins clean', isCompleted: false),
      ],
    ),
    FestiveNoteEntity(
      id: 'note_2',
      festivalGroup: 'Diwali 2024',
      festivalSubtitle: 'Lakshmi Puja • Friday, Nov 1',
      daysLeftText: 'In 4 days',
      tag: 'Catering',
      title: 'Family Dinner Menu & Mithai',
      body: '• 2 kg Kaju Katli + 1.5 kg Motichoor Ladoo from Bikanervala\n• Dinner spread: Shahi Paneer, Dal Makhani, Zafrani Pulao, stuffed Kulchas\n• Confirm compostable areca leaf plates (50 pax)',
      lastModified: 'Modified Yesterday',
    ),
    FestiveNoteEntity(
      id: 'note_3',
      festivalGroup: 'Bhai Dooj',
      festivalSubtitle: 'Auspicious Tika Muhurat • Sunday, Nov 3',
      daysLeftText: 'In 6 days',
      tag: 'Gifts',
      title: 'Gifts for Priya & Rohan',
      body: 'Priya: Handcrafted silver oxidized jhumkas + roasted dry fruit hamper.\nRohan: Khadi silk kurta set (Size 40, peacock teal color).',
      lastModified: 'Yesterday',
      budget: '₹5,000 Budget',
      estimatedSpend: 'Estimated spend: ₹4,650',
      reminderTime: 'Saturday, Nov 2 • 7:00 PM',
    ),
    FestiveNoteEntity(
      id: 'note_4',
      festivalGroup: 'Chhath Puja',
      festivalSubtitle: 'Sandhya Arghya • Thursday, Nov 7',
      daysLeftText: 'In 10 days',
      tag: 'Rituals',
      title: 'Thekua Prep & Bamboo Soop',
      body: '1. Procure traditional handwoven bamboo soop (4 pieces) and clay stoves.\n2. Stone-ground whole wheat flour and organic sugarcane jaggery stock check.\n3. Arrange fresh seasonal produce: Daabh nimbu, raw turmeric rhizomes, ginger plants, water chestnuts (singhara).',
      lastModified: 'Created 3 days ago',
      reminderTime: 'Nov 5 prep alert',
      imageUrl: AppAssets.chhathBambooSoop,
    ),
  ];

  List<FestiveNoteEntity> get allNotes => _notes;

  List<FestiveNoteEntity> get filteredNotes {
    return _notes.where((note) {
      final matchesCategory = _selectedCategory == 'All' || note.tag == _selectedCategory;
      final matchesQuery = _searchQuery.isEmpty ||
          note.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          note.body.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          note.festivalGroup.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).toList();
  }

  int get totalNotesCount => _notes.length;
  int get activeRemindersCount => _notes.where((n) => n.reminderTime != null).length;
  int get completedTasksCount => 12;

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void addNote(FestiveNoteEntity note) {
    _notes.insert(0, note);
    notifyListeners();
  }

  void deleteNote(String noteId) {
    _notes.removeWhere((n) => n.id == noteId);
    notifyListeners();
  }
}
