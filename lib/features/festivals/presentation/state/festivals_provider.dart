import 'package:flutter/foundation.dart';
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
  bool _isLoading = false;

  List<FestivalEntity> get allFestivals => _allFestivals;
  FestivalEntity? get spotlightFestival => _spotlightFestival;
  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;
  FestivalSortOption get sortOption => _sortOption;
  bool get isLoading => _isLoading;

  List<FestivalEntity> get filteredFestivals {
    var list = _allFestivals.where((f) {
      final matchesCategory = _selectedCategory == 'all' || f.category == _selectedCategory;
      final matchesQuery = _searchQuery.isEmpty ||
          f.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          f.tithi.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          f.description.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).toList();

    switch (_sortOption) {
      case FestivalSortOption.soonest:
      case FestivalSortOption.byMonth:
        list.sort((a, b) => a.dateTime.compareTo(b.dateTime));
        break;
      case FestivalSortOption.alphabetical:
        list.sort((a, b) => a.name.compareTo(b.name));
        break;
    }

    return list;
  }

  Future<void> loadFestivals() async {
    _isLoading = true;
    notifyListeners();

    _allFestivals = await _repository.getAllFestivals();
    _spotlightFestival = await _repository.getSpotlightFestival();

    _isLoading = false;
    notifyListeners();
  }

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setSortOption(FestivalSortOption option) {
    _sortOption = option;
    notifyListeners();
  }
}
