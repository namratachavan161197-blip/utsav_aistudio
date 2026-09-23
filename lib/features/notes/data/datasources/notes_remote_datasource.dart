import 'package:cloud_firestore/cloud_firestore.dart';
import '../../domain/entities/festive_note_entity.dart';

/// Real-time Firebase Firestore Remote Data Source for Festive Notes
class NotesRemoteDataSource {
  final FirebaseFirestore _firestore;

  NotesRemoteDataSource({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  CollectionReference<Map<String, dynamic>> _userNotes(String userId) =>
      _firestore.collection('users').doc(userId).collection('notes');

  /// Listen to real-time notes stream for the logged-in user
  Stream<List<FestiveNoteEntity>> streamUserNotes(String userId) {
    return _userNotes(userId).snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        final data = doc.data();
        return FestiveNoteEntity(
          id: doc.id,
          festivalGroup: data['festivalGroup'] as String? ?? 'Diwali 2024',
          festivalSubtitle: data['festivalSubtitle'] as String? ?? '',
          daysLeftText: data['daysLeftText'] as String? ?? '',
          tag: data['tag'] as String? ?? 'Shopping',
          title: data['title'] as String? ?? '',
          body: data['body'] as String? ?? '',
          lastModified: data['lastModified'] as String? ?? 'Just now',
          reminderTime: data['reminderTime'] as String?,
          budget: data['budget'] as String?,
          estimatedSpend: data['estimatedSpend'] as String?,
          imageUrl: data['imageUrl'] as String?,
          checklistItems: (data['checklistItems'] as List<dynamic>?)
                  ?.map((item) => ChecklistItem(
                        id: item['id'] as String,
                        title: item['title'] as String,
                        isCompleted: item['isCompleted'] as bool? ?? false,
                      ))
                  .toList() ??
              const [],
        );
      }).toList();
    });
  }

  /// Create or update a note in real-time
  Future<void> saveNote(String userId, FestiveNoteEntity note) async {
    await _userNotes(userId).doc(note.id).set({
      'festivalGroup': note.festivalGroup,
      'festivalSubtitle': note.festivalSubtitle,
      'daysLeftText': note.daysLeftText,
      'tag': note.tag,
      'title': note.title,
      'body': note.body,
      'lastModified': note.lastModified,
      'reminderTime': note.reminderTime,
      'budget': note.budget,
      'estimatedSpend': note.estimatedSpend,
      'imageUrl': note.imageUrl,
      'checklistItems': note.checklistItems
          .map((c) => {
                'id': c.id,
                'title': c.title,
                'isCompleted': c.isCompleted,
              })
          .toList(),
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  /// Delete a note from Firestore
  Future<void> deleteNote(String userId, String noteId) async {
    await _userNotes(userId).doc(noteId).delete();
  }
}
