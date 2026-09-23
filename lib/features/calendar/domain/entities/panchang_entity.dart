class PanchangDayEntity {
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
  final String? noteSnippet;
  final bool hasMajorFestival;
  final bool hasVrat;
  final bool isAmavasyaOrPurnima;

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
    this.noteSnippet,
    this.hasMajorFestival = false,
    this.hasVrat = false,
    this.isAmavasyaOrPurnima = false,
  });
}
