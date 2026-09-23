import '../../domain/entities/festival_entity.dart';

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

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'hindiName': hindiName,
      'month': month,
      'day': day,
      'dateTime': dateTime.toIso8601String(),
      'tithi': tithi,
      'vikramSamvat': vikramSamvat,
      'countdownText': countdownText,
      'description': description,
      'region': region,
      'shubhMuhuratTime': shubhMuhuratTime,
      'shubhMuhuratWindow': shubhMuhuratWindow,
      'category': category,
      'notesCount': notesCount,
      'isSpotlight': isSpotlight,
      'heroImageUrl': heroImageUrl,
      'rituals': rituals,
    };
  }
}
