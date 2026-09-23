import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/constants/app_assets.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entities/festival_entity.dart';

class FestivalDetailScreen extends StatefulWidget {
  final FestivalEntity festival;

  const FestivalDetailScreen({
    super.key,
    required this.festival,
  });

  @override
  State<FestivalDetailScreen> createState() => _FestivalDetailScreenState();
}

class _FestivalDetailScreenState extends State<FestivalDetailScreen> {
  bool _isAlarmSet = false;
  bool _isBookmarked = false;
  final List<bool> _checklist = [true, true, false];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.onSurface),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Festival Detail',
          style: GoogleFonts.outfit(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: AppColors.onSurface,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Sharing ${widget.festival.name} timings...')),
              );
            },
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
      bottomNavigationBar: SafeArea(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 50),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              elevation: 4,
            ),
            icon: const Icon(Icons.edit_note),
            label: Text(
              'Edit Notes & Checklist',
              style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold),
            ),
            onPressed: () => _showAddNoteDialog(context),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          // Hero Detail Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.inverseSurface,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.flare, size: 14, color: AppColors.primaryFixed),
                          const SizedBox(width: 4),
                          Text(
                            widget.festival.tithi,
                            style: GoogleFonts.outfit(
                              fontSize: 11,
                              color: AppColors.primaryFixed,
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (widget.festival.vikramSamvat != null)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          widget.festival.vikramSamvat!,
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            color: AppColors.primaryFixedDim,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    Text(
                      widget.festival.name,
                      style: GoogleFonts.epilogue(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    if (widget.festival.hindiName != null) ...[
                      const SizedBox(width: 8),
                      Text(
                        widget.festival.hindiName!,
                        style: GoogleFonts.outfit(
                          fontSize: 18,
                          color: AppColors.primaryFixedDim,
                        ),
                      ),
                    ],
                  ],
                ),
                Text(
                  '${widget.festival.month} ${widget.festival.day}, 2024',
                  style: GoogleFonts.outfit(
                    fontSize: 15,
                    fontWeight: FontWeight.w500,
                    color: AppColors.primaryFixed,
                  ),
                ),
                const SizedBox(height: 16),

                // Shubh Muhurat Glow Box
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.timer, size: 16, color: AppColors.primaryFixed),
                              const SizedBox(width: 6),
                              Text(
                                'SHUBH LAKSHMI PUJA MUHURAT',
                                style: GoogleFonts.outfit(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.primaryFixed,
                                ),
                              ),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.primary,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Text(
                              'Auspicious',
                              style: GoogleFonts.outfit(
                                fontSize: 10,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        widget.festival.shubhMuhuratTime,
                        style: GoogleFonts.epilogue(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primaryFixed,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.festival.shubhMuhuratWindow ?? 'Duration: 1 hr 53 mins • Pradosh Kaal Window',
                        style: GoogleFonts.outfit(
                          fontSize: 12,
                          color: Colors.white70,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 4 Action Buttons Grid
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildActionButton(Icons.share, 'Share', () {}),
              _buildActionButton(
                _isAlarmSet ? Icons.alarm_on : Icons.alarm_add,
                _isAlarmSet ? '6:12 PM Set' : 'Set Alarm',
                () => setState(() => _isAlarmSet = !_isAlarmSet),
                color: AppColors.tertiary,
              ),
              _buildActionButton(Icons.menu_book, 'Samagri', () => _showSamagriModal(context)),
              _buildActionButton(
                _isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                _isBookmarked ? 'Saved' : 'Bookmark',
                () => setState(() => _isBookmarked = !_isBookmarked),
                color: AppColors.secondary,
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Significance & Rituals
          Text(
            'Significance & Rituals',
            style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          _buildRitualAccordion(
            title: 'Evening Lakshmi & Ganesha Puja',
            body: 'Invoke auspicious energies by performing the shodashopachara rituals during Pradosh Kaal. Place fresh lotus flowers, batasha sweets, and five whole betel nuts alongside silver coins to welcome Maa Lakshmi and Lord Ganesha.',
            tip: 'Tip: Face East or North while performing the central Sankalpa.',
          ),
          _buildRitualAccordion(
            title: 'Lighting Diyas & Deep Daan',
            body: 'Light the prime four-wick Sarvatomukhi brass or clay diya first with pure cow ghee. Position pairs of earthen mustard oil diyas across threshold boundaries, balconies, water storage, and Tulsi Vrindavan to dispel darkness.',
          ),
          _buildRitualAccordion(
            title: 'Naivedya & Sweets Preparation',
            body: 'Prepare Kheer, Mohan Thal, or Besan Laddus in the morning using freshly roasted dry fruits. Traditional offerings also include sweetened popped lotus seeds (makhana) and puffed rice with batasha for neighbors and family.',
          ),
          const SizedBox(height: 18),

          // Rangoli Inspiration Banner
          Container(
            height: 110,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              image: const DecorationImage(
                image: NetworkImage(AppAssets.rangoliInspiration),
                fit: BoxFit.cover,
              ),
            ),
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                gradient: LinearGradient(
                  colors: [Colors.white.withOpacity(0.92), Colors.transparent],
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'PUJA DECOR INSPIRATION',
                    style: GoogleFonts.outfit(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: AppColors.primary,
                    ),
                  ),
                  Text(
                    'Courtyard & Entrance Rangoli',
                    style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    'Geometric lotus petals & brass deepams',
                    style: GoogleFonts.outfit(fontSize: 12, color: AppColors.onSurfaceVariant),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // My Notes & Preparation
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.draw, color: AppColors.primary, size: 20),
                  const SizedBox(width: 6),
                  Text(
                    'My Notes & Preparation',
                    style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(width: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                    decoration: BoxDecoration(
                      color: AppColors.primaryFixed,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      '2',
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: AppColors.onPrimaryFixed,
                      ),
                    ),
                  ),
                ],
              ),
              TextButton.icon(
                onPressed: () => _showAddNoteDialog(context),
                icon: const Icon(Icons.add_circle, size: 16),
                label: const Text('Add Note'),
              ),
            ],
          ),

          // Active Note Card 1: Sweets List
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainer,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const CircleAvatar(
                      radius: 16,
                      backgroundColor: AppColors.secondaryFixed,
                      child: Icon(Icons.featured_seasonal_and_gifts, color: AppColors.secondary, size: 18),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Sweets & Gifts Distribution List',
                            style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            'Edited yesterday',
                            style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Pick up Kaju Katli boxes from Bikanerwala at 11 AM; deliver dry fruit hampers to Sharma ji and Verma family before 4 PM.',
                  style: GoogleFonts.outfit(fontSize: 13, color: AppColors.onSurfaceVariant),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  children: [
                    _buildTag('Family & Friends', AppColors.surfaceHighest),
                    _buildTag('High Priority', AppColors.primaryFixed.withOpacity(0.5)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Active Note Card 2: Interactive Checklist
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainer,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const CircleAvatar(
                      radius: 16,
                      backgroundColor: AppColors.tertiaryFixed,
                      child: Icon(Icons.checklist_rtl, color: AppColors.tertiary, size: 18),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Home Decor & Puja Setup',
                            style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            'Updated today, 09:30 AM',
                            style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                _buildChecklistItem(0, 'Buy 51 clay diyas and pure desi ghee', _checklist[0]),
                _buildChecklistItem(1, 'Get fresh marigold and mango leaves for toran', _checklist[1]),
                _buildChecklistItem(2, 'Rangoli stencils for entrance', _checklist[2]),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: _checklist.where((c) => c).length / _checklist.length,
                  backgroundColor: AppColors.surfaceHighest,
                  color: AppColors.primary,
                  borderRadius: BorderRadius.circular(4),
                ),
                const SizedBox(height: 4),
                Text(
                  '${_checklist.where((c) => c).length} of ${_checklist.length} done',
                  style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant),
                ),
              ],
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildTag(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(text, style: GoogleFonts.outfit(fontSize: 11, color: AppColors.onSurfaceVariant)),
    );
  }

  Widget _buildActionButton(IconData icon, String label, VoidCallback onTap,
      {Color color = AppColors.primary}) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          CircleAvatar(
            radius: 22,
            backgroundColor: color.withOpacity(0.15),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(height: 4),
          Text(label, style: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _buildRitualAccordion({required String title, required String body, String? tip}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: AppColors.surfaceContainer,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ExpansionTile(
        title: Text(title, style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.w600)),
        leading: const Icon(Icons.water_drop, color: AppColors.primary, size: 20),
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
        children: [
          Text(body, style: GoogleFonts.outfit(fontSize: 13, color: AppColors.onSurfaceVariant)),
          if (tip != null) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.surfaceHighest,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Icon(Icons.lightbulb_outline, size: 16, color: AppColors.tertiary),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      tip,
                      style: GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.w500),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildChecklistItem(int index, String text, bool value) {
    return CheckboxListTile(
      dense: true,
      contentPadding: EdgeInsets.zero,
      value: value,
      activeColor: AppColors.primary,
      onChanged: (val) {
        setState(() => _checklist[index] = val ?? false);
      },
      title: Text(
        text,
        style: GoogleFonts.outfit(
          fontSize: 13,
          decoration: value ? TextDecoration.lineThrough : null,
          color: value ? AppColors.onSurfaceVariant : AppColors.onSurface,
        ),
      ),
    );
  }

  void _showSamagriModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Lakshmi Puja Samagri List',
                style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            const Text(
              '• 51 Clay Diyas and pure Cow Ghee\n'
              '• Fresh Lotus flowers & Marigold toran\n'
              '• Batasha, dry fruits, and silver coins\n'
              '• Roli, Kumkum, Chandan, and Akshat\n'
              '• Betel nuts, cloves, and camphor',
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                minimumSize: const Size(double.infinity, 44),
              ),
              onPressed: () => Navigator.pop(context),
              child: const Text('Add to My Notes Checklist', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  void _showAddNoteDialog(BuildContext context) {
    final ctrl = TextEditingController();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Add Festival Note', style: GoogleFonts.epilogue(fontWeight: FontWeight.bold)),
        content: TextField(
          controller: ctrl,
          decoration: const InputDecoration(hintText: 'e.g. Bring Kaju Katli at 4 PM'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Note saved to My Notes!')),
              );
            },
            child: const Text('Save', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
