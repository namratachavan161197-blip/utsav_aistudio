import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_assets.dart';
import '../../../../core/theme/app_colors.dart';
import '../state/festivals_provider.dart';
import '../widgets/festival_list_item.dart';
import '../widgets/festival_spotlight_card.dart';

class FestivalsScreen extends StatefulWidget {
  const FestivalsScreen({super.key});

  @override
  State<FestivalsScreen> createState() => _FestivalsScreenState();
}

class _FestivalsScreenState extends State<FestivalsScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<FestivalsProvider>();

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
                  'Festivals',
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
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('No unread festival alerts.')),
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
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: provider.loadFestivals,
              color: AppColors.primary,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                children: [
                  // Search Bar
                  Container(
                    decoration: BoxDecoration(
                      color: AppColors.surfaceHigh,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: TextField(
                      controller: _searchController,
                      onChanged: provider.setSearchQuery,
                      decoration: const InputDecoration(
                        prefixIcon: Icon(Icons.search, color: AppColors.primary),
                        suffixIcon: Icon(Icons.mic, color: AppColors.onSurfaceVariant),
                        hintText: 'Search festivals, tithi, muhurat...',
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.symmetric(vertical: 12),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),

                  // Quick Filter Chips
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        _buildFilterChip('All (${provider.allFestivals.length})', 'all', provider),
                        _buildFilterChip('✨ Major', 'major', provider),
                        _buildFilterChip('🕊️ Vrat & Fasting', 'vrat', provider),
                        _buildFilterChip('🌺 Regional', 'regional', provider),
                        _buildFilterChip('🪔 Jayanti', 'jayanti', provider),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Sorting Toolbar
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceLow,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.swap_vert, size: 16, color: AppColors.onSurfaceVariant),
                            const SizedBox(width: 4),
                            Text(
                              'SORT BY',
                              style: GoogleFonts.outfit(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: AppColors.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceHigh,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            children: [
                              _buildSortBtn('Soonest First', FestivalSortOption.soonest, provider),
                              _buildSortBtn('By Month', FestivalSortOption.byMonth, provider),
                              _buildSortBtn('A-Z', FestivalSortOption.alphabetical, provider),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Spotlight Card (Diwali)
                  if (provider.spotlightFestival != null)
                    FestivalSpotlightCard(
                      festival: provider.spotlightFestival!,
                      onAddNote: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Note added for ${provider.spotlightFestival!.name}!')),
                        );
                      },
                    ),

                  const SizedBox(height: 24),

                  // Section Title
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Upcoming Celebrations',
                            style: GoogleFonts.epilogue(
                              fontSize: 19,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'Kartik & Magha Maas 2024–2025',
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              color: AppColors.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceHigh,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          '${provider.filteredFestivals.where((f) => !f.isSpotlight).length} Next',
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.primary,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Festival Cards List
                  ...provider.filteredFestivals
                      .where((f) => !f.isSpotlight)
                      .map(
                        (f) => FestivalListItem(
                          festival: f,
                          onNoteTap: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Notes for ${f.name}')),
                            );
                          },
                        ),
                      ),

                  const SizedBox(height: 20),

                  // Auspicious Quote Card
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainer,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.spa_outlined, color: AppColors.primary, size: 28),
                        const SizedBox(height: 4),
                        Text(
                          '"Sarve Bhavantu Sukhinah"',
                          style: GoogleFonts.epilogue(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'May the festive glow bring peace, prosperity, and joyous celebrations to your family.',
                          textAlign: TextAlign.center,
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            color: AppColors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
    );
  }

  Widget _buildFilterChip(String label, String key, FestivalsProvider provider) {
    final isSelected = provider.selectedCategory == key;
    return Padding(
      padding: const EdgeInsets.only(right: 6.0),
      child: GestureDetector(
        onTap: () => provider.setCategory(key),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
          decoration: BoxDecoration(
            color: isSelected ? AppColors.primary : AppColors.surfaceHigh,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(
            label,
            style: GoogleFonts.outfit(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: isSelected ? Colors.white : AppColors.onSurfaceVariant,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSortBtn(String label, FestivalSortOption option, FestivalsProvider provider) {
    final isSelected = provider.sortOption == option;
    return GestureDetector(
      onTap: () => provider.setSortOption(option),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 11,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
            color: isSelected ? AppColors.primary : AppColors.onSurfaceVariant,
          ),
        ),
      ),
    );
  }
}
