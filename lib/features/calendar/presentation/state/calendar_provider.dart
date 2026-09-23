import 'package:flutter/foundation.dart';
import '../../domain/entities/panchang_entity.dart';

class CalendarProvider extends ChangeNotifier {
  int _selectedDay = 1;
  String _selectedCity = 'New Delhi';
  bool _isCalendarView = true; // true = Calendar, false = List

  int get selectedDay => _selectedDay;
  String get selectedCity => _selectedCity;
  bool get isCalendarView => _isCalendarView;

  final Map<int, PanchangDayEntity> _panchangCache = {
    1: const PanchangDayEntity(
      day: 1,
      month: 'November',
      year: 2024,
      pakshaAndTithi: 'Kartik Krishna Paksha Amavasya',
      sunrise: '06:33 AM',
      sunset: '05:35 PM',
      tithiEnd: '06:16 PM',
      shubhMuhuratName: 'Lakshmi Puja Muhurat',
      shubhMuhuratTime: '05:36 PM to 06:16 PM (Duration: 41 mins)',
      festivalsOnDay: ['Diwali (Lakshmi Puja)', 'Kali Puja', 'Narak Chaturdashi'],
      noteSnippet: 'Puja with family at 6:30 PM, gifts ready. Mithai boxes packed for neighbors.',
      hasMajorFestival: true,
      hasVrat: true,
      isAmavasyaOrPurnima: true,
    ),
    2: const PanchangDayEntity(
      day: 2,
      month: 'November',
      year: 2024,
      pakshaAndTithi: 'Kartik Shukla Pratipada',
      sunrise: '06:34 AM',
      sunset: '05:34 PM',
      tithiEnd: '08:21 PM',
      shubhMuhuratName: 'Govardhan Puja Pratahkal',
      shubhMuhuratTime: '06:34 AM to 08:46 AM',
      festivalsOnDay: ['Govardhan Puja', 'Annakut Mahotsav'],
      hasMajorFestival: true,
    ),
    3: const PanchangDayEntity(
      day: 3,
      month: 'November',
      year: 2024,
      pakshaAndTithi: 'Kartik Shukla Dwitiya',
      sunrise: '06:35 AM',
      sunset: '05:33 PM',
      tithiEnd: '10:05 PM',
      shubhMuhuratName: 'Bhai Dooj Aparahna Muhurat',
      shubhMuhuratTime: '01:10 PM to 03:22 PM',
      festivalsOnDay: ['Bhai Dooj', 'Yama Dwitiya'],
      hasMajorFestival: true,
    ),
    7: const PanchangDayEntity(
      day: 7,
      month: 'November',
      year: 2024,
      pakshaAndTithi: 'Kartik Shukla Shashti',
      sunrise: '06:38 AM',
      sunset: '05:31 PM',
      tithiEnd: '12:34 AM (Nov 8)',
      shubhMuhuratName: 'Sandhya Arghya Muhurat',
      shubhMuhuratTime: '05:31 PM',
      festivalsOnDay: ['Chhath Puja (Evening Arghya)'],
      hasVrat: true,
    ),
    15: const PanchangDayEntity(
      day: 15,
      month: 'November',
      year: 2024,
      pakshaAndTithi: 'Kartik Shukla Purnima',
      sunrise: '06:44 AM',
      sunset: '05:27 PM',
      tithiEnd: '02:58 AM (Nov 16)',
      shubhMuhuratName: 'Dev Deepawali Pradosh Kaal',
      shubhMuhuratTime: '05:10 PM to 07:45 PM',
      festivalsOnDay: ['Dev Deepawali', 'Guru Nanak Jayanti', 'Kartik Purnima Snan'],
      hasMajorFestival: true,
      isAmavasyaOrPurnima: true,
    ),
  };

  PanchangDayEntity get currentDayPanchang {
    return _panchangCache[_selectedDay] ??
        PanchangDayEntity(
          day: _selectedDay,
          month: 'November',
          year: 2024,
          pakshaAndTithi: 'Kartik Maas Day $_selectedDay',
          sunrise: '06:35 AM',
          sunset: '05:33 PM',
          tithiEnd: '07:15 PM',
          shubhMuhuratName: 'Abhijit Muhurat',
          shubhMuhuratTime: '11:43 AM to 12:26 PM',
        );
  }

  void selectDay(int day) {
    _selectedDay = day;
    notifyListeners();
  }

  void setCity(String city) {
    _selectedCity = city;
    notifyListeners();
  }

  void toggleViewMode(bool isCalendar) {
    _isCalendarView = isCalendar;
    notifyListeners();
  }
}
