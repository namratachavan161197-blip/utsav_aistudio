import '../entities/festival_entity.dart';

abstract class FestivalRepository {
  Future<List<FestivalEntity>> getAllFestivals();
  Future<FestivalEntity?> getSpotlightFestival();
  Future<FestivalEntity?> getFestivalById(String id);
}
