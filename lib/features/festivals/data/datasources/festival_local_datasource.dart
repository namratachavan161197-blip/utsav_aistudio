import '../../../../core/constants/app_assets.dart';
import '../../domain/entities/festival_entity.dart';
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
      shubhMuhuratWindow: 'Pradosh Kaal Window (1 hr 53 mins)',
      category: 'major',
      notesCount: 2,
      isSpotlight: true,
      heroImageUrl: AppAssets.diwaliSpotlight,
      rituals: [
        'Evening Lakshmi & Ganesha Puja: Invoke auspicious energies by performing the shodashopachara rituals during Pradosh Kaal.',
        'Lighting Diyas & Deep Daan: Light the prime four-wick Sarvatomukhi brass diya first with pure cow ghee.',
        'Naivedya & Sweets Preparation: Prepare Kheer, Mohan Thal, or Besan Laddus in the morning with dry fruits.',
      ],
    ),
    FestivalModel(
      id: 'govardhan',
      name: 'Govardhan Puja & Annakut',
      month: 'NOV',
      day: '02',
      dateTime: DateTime(2024, 11, 2),
      tithi: 'Pratipada Tithi',
      countdownText: 'In 5 Days',
      description: 'Celebrating Krishna lifting Govardhan Hill & Chhappan Bhog',
      region: 'North & West India',
      shubhMuhuratTime: '03:22 PM',
      category: 'major',
      notesCount: 1,
    ),
    FestivalModel(
      id: 'bhaidooj',
      name: 'Bhai Dooj (Yama Dwitiya)',
      month: 'NOV',
      day: '03',
      dateTime: DateTime(2024, 11, 3),
      tithi: 'Dwitiya Tithi',
      countdownText: 'In 6 Days',
      description: 'Sacred sibling bond celebration & auspicious tilak muhurat',
      region: 'Pan-India',
      shubhMuhuratTime: 'Aparahna 01:10 PM',
      category: 'major',
      notesCount: 1,
    ),
    FestivalModel(
      id: 'chhath',
      name: 'Chhath Puja (Sandhya Arghya)',
      month: 'NOV',
      day: '07',
      dateTime: DateTime(2024, 11, 7),
      tithi: 'Shashti Tithi',
      countdownText: 'In 10 Days',
      description: 'Solemn solar deity worship, Thekua prasad, and holy river rituals',
      region: 'Bihar, UP & Global',
      shubhMuhuratTime: 'Sunset Arghya 05:32 PM',
      category: 'vrat',
      notesCount: 3,
    ),
    FestivalModel(
      id: 'devdeepawali',
      name: 'Dev Deepawali',
      month: 'NOV',
      day: '15',
      dateTime: DateTime(2024, 11, 15),
      tithi: 'Kartik Purnima',
      countdownText: 'In 18 Days',
      description: 'Varanasi Ghats lit with million earthen lamps for the Gods',
      region: 'Varanasi, UP',
      shubhMuhuratTime: 'Tripuri Purnima / Pradosh',
      category: 'regional',
      notesCount: 0,
    ),
    FestivalModel(
      id: 'makarsankranti',
      name: 'Makar Sankranti & Pongal',
      month: 'JAN',
      day: '14',
      dateTime: DateTime(2025, 1, 14),
      tithi: 'Uttarayan Transit',
      countdownText: 'Jan 2025',
      description: 'Harvest festival, kite flying, sesame til-gul, & Surya Vandana',
      region: 'Pan-India & Diaspora',
      shubhMuhuratTime: 'Punya Kaal',
      category: 'major',
      notesCount: 0,
    ),
  ];

  @override
  Future<List<FestivalEntity>> getAllFestivals() async {
    return _mockFestivals;
  }

  @override
  Future<FestivalEntity?> getSpotlightFestival() async {
    return _mockFestivals.firstWhere((f) => f.isSpotlight, orElse: () => _mockFestivals.first);
  }

  @override
  Future<FestivalEntity?> getFestivalById(String id) async {
    try {
      return _mockFestivals.firstWhere((f) => f.id == id);
    } catch (_) {
      return null;
    }
  }
}
