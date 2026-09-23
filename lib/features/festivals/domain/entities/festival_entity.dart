class FestivalEntity {
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
  final String category; // 'major', 'vrat', 'regional', 'jayanti'
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
