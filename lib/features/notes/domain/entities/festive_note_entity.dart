class ChecklistItem {
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
  final String festivalGroup; // 'Diwali 2024', 'Bhai Dooj', etc.
  final String festivalSubtitle;
  final String daysLeftText;
  final String tag;
  final String title;
  final String body;
  final String lastModified;
  final String? reminderTime;
  final String? budget;
  final String? estimatedSpend;
  final String? imageUrl;
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
    this.estimatedSpend,
    this.imageUrl,
    this.checklistItems = const [],
  });
}
