import 'package:cloud_firestore/cloud_firestore.dart';
import '../../domain/entities/festival_entity.dart';
import '../../domain/repositories/festival_repository.dart';
import '../models/festival_model.dart';

/// Real-time Firebase Firestore Remote Data Source for Festivals
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
