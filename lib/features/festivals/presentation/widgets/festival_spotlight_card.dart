import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/theme/app_colors.dart';
import '../../domain/entities/festival_entity.dart';
import '../screens/festival_detail_screen.dart';

class FestivalSpotlightCard extends StatelessWidget {
  final FestivalEntity festival;
  final VoidCallback? onAddNote;

  const FestivalSpotlightCard({
    super.key,
    required this.festival,
    this.onAddNote,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.inverseSurface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.18),
            blurRadius: 14,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          // Background ambient Diya photo
          if (festival.heroImageUrl != null)
            Positioned.fill(
              child: Opacity(
                opacity: 0.35,
                child: Image.network(
                  festival.heroImageUrl!,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(color: Colors.black54),
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.primaryContainer,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.local_fire_department, size: 14, color: Colors.white),
                          const SizedBox(width: 4),
                          Text(
                            festival.countdownText.toUpperCase(),
                            style: GoogleFonts.outfit(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.18),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.calendar_today, size: 12, color: Colors.white),
                          const SizedBox(width: 4),
                          Text(
                            '${festival.month} ${festival.day}, 2024',
                            style: GoogleFonts.outfit(
                              fontSize: 11,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                Text(
                  festival.region.toUpperCase(),
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                    color: AppColors.primaryFixed,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Text(
                      festival.name,
                      style: GoogleFonts.epilogue(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.flare, color: AppColors.primaryFixedDim, size: 22),
                  ],
                ),
                Text(
                  festival.description,
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 14),

                // Muhurat sub-box
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: AppColors.primaryContainer,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.wb_twilight, size: 18, color: Colors.white),
                          ),
                          const SizedBox(width: 10),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'SHUBH MUHURAT',
                                style: GoogleFonts.outfit(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.primaryFixed,
                                ),
                              ),
                              Text(
                                festival.shubhMuhuratTime,
                                style: GoogleFonts.outfit(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          'Pradosh Kaal',
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            color: Colors.white70,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Action buttons
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: AppColors.inverseSurface,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          elevation: 0,
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                        icon: const Icon(Icons.edit_note, size: 18, color: AppColors.primary),
                        label: const Text('Add Note'),
                        onPressed: onAddNote,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                        icon: const Icon(Icons.arrow_forward, size: 16),
                        label: const Text('Muhurat Guide'),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => FestivalDetailScreen(festival: festival),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
