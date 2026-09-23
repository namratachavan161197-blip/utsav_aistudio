import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_assets.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entities/festive_note_entity.dart';
import '../state/notes_provider.dart';

class MyNotesScreen extends StatefulWidget {
  const MyNotesScreen({super.key});

  @override
  State<MyNotesScreen> createState() => _MyNotesScreenState();
}

class _MyNotesScreenState extends State<MyNotesScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<NotesProvider>();

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          children: [
            Image.network(
              AppAssets.appLogo,
              height: 32,
              errorBuilder: (_, __, ___) => const Icon(Icons.wb_sunny, color: AppColors.primary),
            ),
            const SizedBox(width: 8),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Utsav',
                  style: GoogleFonts.epilogue(
                    fontSize: 19,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                    height: 1.1,
                  ),
                ),
                Text(
                  'My Notes',
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    color: AppColors.onSurfaceVariant,
                    height: 1.1,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 16,
              backgroundImage: NetworkImage(AppAssets.profileAvatar),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: Text(
          'New Note',
          style: GoogleFonts.outfit(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        onPressed: () => _showCreateNoteSheet(context, provider),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          // Header Aura & Motivation
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.auto_awesome, color: AppColors.primary, size: 16),
                  const SizedBox(width: 4),
                  Text(
                    'PREPARATION & SANKALPA',
                    style: GoogleFonts.outfit(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.1,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.surfaceHigh,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  'Karthik Month 2024',
                  style: GoogleFonts.outfit(fontSize: 10, color: AppColors.onSurfaceVariant),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            'Stay organized across auspicious muhurats, family feasts, and joyous gift-giving.',
            style: GoogleFonts.outfit(fontSize: 13, color: AppColors.onSurfaceVariant),
          ),
          const SizedBox(height: 12),

          // Stats Bento Strip
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainer,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatItem('${provider.totalNotesCount}', 'Total Notes', Icons.sticky_note_2_outlined),
                _buildStatItem('${provider.activeRemindersCount}', 'Reminders', Icons.notifications_active, color: AppColors.primary),
                _buildStatItem('${provider.completedTasksCount}', 'Tasks Done', Icons.task_alt, color: AppColors.tertiary),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Search Field
          Container(
            decoration: BoxDecoration(
              color: AppColors.surfaceHigh,
              borderRadius: BorderRadius.circular(12),
            ),
            child: TextField(
              controller: _searchController,
              onChanged: provider.setSearchQuery,
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.search, color: AppColors.onSurfaceVariant),
                suffixIcon: Icon(Icons.mic, color: AppColors.primary),
                hintText: 'Search checklists, recipes, rituals...',
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(vertical: 12),
              ),
            ),
          ),
          const SizedBox(height: 10),

          // Category Pills
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ['All', 'Shopping', 'Rituals', 'Guests', 'Gifts', 'Catering'].map((cat) {
                final isSelected = provider.selectedCategory == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 6.0),
                  child: GestureDetector(
                    onTap: () => provider.setCategory(cat),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : AppColors.surfaceHigh,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        cat,
                        style: GoogleFonts.outfit(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: isSelected ? Colors.white : AppColors.onSurfaceVariant,
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),

          // Render Notes Grouped
          ...provider.filteredNotes.map((note) => _buildNoteCard(context, note, provider)),

          const SizedBox(height: 14),

          // Cultural Footer Vignette
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  backgroundColor: AppColors.primaryFixed,
                  child: Icon(Icons.spa, color: AppColors.primary, size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Joy is in the Preparation',
                        style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'Shared lists notify family members instantly via WhatsApp.',
                        style: GoogleFonts.outfit(fontSize: 12, color: AppColors.onSurfaceVariant),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildStatItem(String count, String label, IconData icon, {Color color = AppColors.onSurface}) {
    return Column(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(height: 2),
        Text(
          count,
          style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold, color: color),
        ),
        Text(
          label,
          style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant),
        ),
      ],
    );
  }

  Widget _buildNoteCard(BuildContext context, FestiveNoteEntity note, NotesProvider provider) {
    Color tagColor = AppColors.tertiaryFixed;
    if (note.tag == 'Gifts') tagColor = AppColors.secondaryFixed;
    if (note.tag == 'Catering') tagColor = AppColors.primaryFixed;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.brown.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Festival Group Banner
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    note.festivalGroup,
                    style: GoogleFonts.epilogue(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    note.festivalSubtitle,
                    style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppColors.secondaryFixed,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  note.daysLeftText,
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSecondaryFixed,
                  ),
                ),
              ),
            ],
          ),
          const Divider(height: 18),

          // Tag & Title
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: tagColor,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  note.tag,
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurface,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              if (note.budget != null)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.tertiaryFixed,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    note.budget!,
                    style: GoogleFonts.outfit(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: AppColors.tertiary,
                    ),
                  ),
                ),
              const Spacer(),
              PopupMenuButton<String>(
                icon: const Icon(Icons.more_vert, size: 18),
                onSelected: (val) {
                  if (val == 'delete') {
                    provider.deleteNote(note.id);
                  }
                },
                itemBuilder: (_) => [
                  const PopupMenuItem(value: 'share', child: Text('Share Note')),
                  const PopupMenuItem(value: 'delete', child: Text('Delete', style: TextStyle(color: Colors.red))),
                ],
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            note.title,
            style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            note.body,
            style: GoogleFonts.outfit(fontSize: 13, color: AppColors.onSurfaceVariant),
          ),

          // Checklist items count
          if (note.checklistItems.isNotEmpty) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.surfaceLow,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '${note.checklistItems.where((i) => i.isCompleted).length} of ${note.checklistItems.length} tasks complete',
                        style: GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '${((note.checklistItems.where((i) => i.isCompleted).length / note.checklistItems.length) * 100).toInt()}%',
                        style: GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.tertiary),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  LinearProgressIndicator(
                    value: note.checklistItems.where((i) => i.isCompleted).length / note.checklistItems.length,
                    backgroundColor: AppColors.surfaceHighest,
                    color: AppColors.tertiary,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ],
              ),
            ),
          ],

          // Attached Reference Image
          if (note.imageUrl != null) ...[
            const SizedBox(height: 10),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                note.imageUrl!,
                height: 100,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => Container(height: 80, color: AppColors.surfaceHighest),
              ),
            ),
          ],

          // Reminder footer
          if (note.reminderTime != null) ...[
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(Icons.alarm_on, size: 16, color: AppColors.primary),
                const SizedBox(width: 6),
                Text(
                  note.reminderTime!,
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }

  void _showCreateNoteSheet(BuildContext context, NotesProvider provider) {
    final titleCtrl = TextEditingController();
    final bodyCtrl = TextEditingController();
    String category = 'Shopping';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => StatefulBuilder(
        builder: (ctx, setModalState) => Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(ctx).viewInsets.bottom + 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Create Celebration Note',
                style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: titleCtrl,
                decoration: const InputDecoration(
                  labelText: 'Note Title',
                  hintText: 'e.g. Mithai order, Puja items, Gifts',
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: bodyCtrl,
                maxLines: 3,
                decoration: const InputDecoration(
                  labelText: 'Preparation Details or Checklist',
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                children: ['Shopping', 'Rituals', 'Guests', 'Gifts', 'Catering'].map((cat) {
                  final isSelected = category == cat;
                  return ChoiceChip(
                    label: Text(cat),
                    selected: isSelected,
                    selectedColor: AppColors.primaryFixed,
                    onSelected: (val) {
                      if (val) setModalState(() => category = cat);
                    },
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  minimumSize: const Size(double.infinity, 44),
                ),
                onPressed: () {
                  if (titleCtrl.text.trim().isNotEmpty) {
                    provider.addNote(
                      FestiveNoteEntity(
                        id: DateTime.now().millisecondsSinceEpoch.toString(),
                        festivalGroup: 'Diwali 2024',
                        festivalSubtitle: 'Lakshmi Puja',
                        daysLeftText: 'In 4 days',
                        tag: category,
                        title: titleCtrl.text.trim(),
                        body: bodyCtrl.text.trim(),
                        lastModified: 'Just now',
                      ),
                    );
                    Navigator.pop(ctx);
                  }
                },
                child: const Text('Save Note', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
