import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_assets.dart';
import '../../../../core/theme/app_colors.dart';
import '../state/calendar_provider.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<CalendarProvider>();
    final panchang = provider.currentDayPanchang;

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
                  'Calendar',
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
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          // Top View Mode & City Selector
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.surfaceLow,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(3),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceHighest,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        children: [
                          _buildViewBtn('Calendar', Icons.calendar_view_month, provider.isCalendarView, () {
                            provider.toggleViewMode(true);
                          }),
                          _buildViewBtn('List', Icons.view_agenda, !provider.isCalendarView, () {
                            provider.toggleViewMode(false);
                          }),
                        ],
                      ),
                    ),
                    TextButton.icon(
                      onPressed: () => _showCityPicker(context, provider),
                      icon: const Icon(Icons.location_on, size: 16, color: AppColors.primary),
                      label: Text(
                        provider.selectedCity,
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

                // Month Navigator Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.chevron_left),
                      onPressed: () {},
                    ),
                    Column(
                      children: [
                        Text(
                          'November 2024',
                          style: GoogleFonts.epilogue(
                            fontSize: 17,
                            fontWeight: FontWeight.bold,
                            color: AppColors.onSurface,
                          ),
                        ),
                        Text(
                          'Kartik - Agrahayana 2081 Vikrami',
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            color: AppColors.primary,
                          ),
                        ),
                      ],
                    ),
                    IconButton(
                      icon: const Icon(Icons.chevron_right),
                      onPressed: () {},
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // Weekday Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: const [
                    Text('S', style: TextStyle(color: AppColors.secondary, fontWeight: FontWeight.bold)),
                    Text('M'), Text('T'), Text('W'), Text('T'),
                    Text('F', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                    Text('S'),
                  ],
                ),
                const SizedBox(height: 8),

                // Calendar Grid
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 7,
                    mainAxisSpacing: 6,
                    crossAxisSpacing: 6,
                  ),
                  itemCount: 35, // 5 leading + 30 days
                  itemBuilder: (context, index) {
                    if (index < 5) {
                      return Center(
                        child: Text(
                          '${27 + index}',
                          style: TextStyle(color: Colors.grey.shade400, fontSize: 12),
                        ),
                      );
                    }
                    final day = index - 4;
                    final isSelected = provider.selectedDay == day;
                    final hasFestival = day == 1 || day == 2 || day == 3 || day == 7 || day == 15 || day == 27;

                    return GestureDetector(
                      onTap: () => provider.selectDay(day),
                      child: Container(
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppColors.primaryContainer
                              : (hasFestival ? AppColors.surfaceContainer : Colors.white),
                          borderRadius: BorderRadius.circular(10),
                          border: isSelected
                              ? Border.all(color: AppColors.primaryFixedDim, width: 2)
                              : null,
                          boxShadow: isSelected
                              ? [BoxShadow(color: AppColors.primaryContainer.withOpacity(0.3), blurRadius: 4)]
                              : null,
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '$day',
                              style: GoogleFonts.outfit(
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                                color: isSelected ? Colors.white : AppColors.onSurface,
                              ),
                            ),
                            if (hasFestival)
                              Container(
                                width: 5,
                                height: 5,
                                margin: const EdgeInsets.only(top: 2),
                                decoration: BoxDecoration(
                                  color: isSelected ? Colors.white : AppColors.primary,
                                  shape: BoxShape.circle,
                                ),
                              ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 10),

                // Legend
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildLegendItem('Major Festival', AppColors.primary),
                    const SizedBox(width: 12),
                    _buildLegendItem('Vrat & Fasting', AppColors.secondary),
                    const SizedBox(width: 12),
                    _buildLegendItem('Purnima / Amavasya', AppColors.tertiary),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Selected Date Details Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.brown.withOpacity(0.06),
                  blurRadius: 10,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.primaryFixed,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                'Day ${panchang.day}',
                                style: GoogleFonts.outfit(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.onPrimaryFixed,
                                ),
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              'Shubh Muhurat Active',
                              style: GoogleFonts.outfit(
                                fontSize: 11,
                                color: AppColors.tertiary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${panchang.day} ${panchang.month} ${panchang.year}',
                          style: GoogleFonts.epilogue(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          panchang.pakshaAndTithi,
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            color: AppColors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                    const CircleAvatar(
                      backgroundColor: AppColors.primaryFixed,
                      child: Icon(Icons.wb_sunny, color: AppColors.primary),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Panchang Solar Strip
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLow,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildMetricCol('Sunrise', panchang.sunrise, Icons.wb_twilight),
                      _buildMetricCol('Sunset', panchang.sunset, Icons.wb_sunny),
                      _buildMetricCol('Tithi Till', panchang.tithiEnd, Icons.timelapse),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Muhurat Banner
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.primaryFixed.withOpacity(0.4),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.stars, color: AppColors.primary),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            panchang.shubhMuhuratName,
                            style: GoogleFonts.outfit(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            panchang.shubhMuhuratTime,
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              color: AppColors.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Festival Badges
                if (panchang.festivalsOnDay.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Text(
                    'FESTIVALS ON THIS DAY',
                    style: GoogleFonts.outfit(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.8,
                      color: AppColors.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: panchang.festivalsOnDay.map((fest) {
                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryContainer.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          fest,
                          style: GoogleFonts.outfit(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppColors.secondary,
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],

                // Curated Visual Highlight Card
                const SizedBox(height: 14),
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Stack(
                    children: [
                      Image.network(
                        AppAssets.deepotsavCalendar,
                        height: 100,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(height: 100, color: AppColors.surfaceHighest),
                      ),
                      Positioned(
                        bottom: 0,
                        left: 0,
                        right: 0,
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [Colors.black.withOpacity(0.8), Colors.transparent],
                              begin: Alignment.bottomCenter,
                              end: Alignment.topCenter,
                            ),
                          ),
                          child: const Text(
                            'Deepotsav Amavasya • Festival of Lights & Prosperity',
                            style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Festive Note Preview
                if (panchang.noteSnippet != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainer,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.edit_note, color: AppColors.primary, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            '"${panchang.noteSnippet!}"',
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildViewBtn(String text, IconData icon, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: active ? AppColors.primary : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Icon(icon, size: 14, color: active ? Colors.white : AppColors.onSurfaceVariant),
            const SizedBox(width: 4),
            Text(
              text,
              style: GoogleFonts.outfit(
                fontSize: 12,
                fontWeight: active ? FontWeight.bold : FontWeight.normal,
                color: active ? Colors.white : AppColors.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLegendItem(String label, Color color) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 4),
        Text(label, style: GoogleFonts.outfit(fontSize: 10)),
      ],
    );
  }

  Widget _buildMetricCol(String title, String val, IconData icon) {
    return Column(
      children: [
        Row(
          children: [
            Icon(icon, size: 12, color: AppColors.onSurfaceVariant),
            const SizedBox(width: 4),
            Text(title, style: GoogleFonts.outfit(fontSize: 10, color: AppColors.onSurfaceVariant)),
          ],
        ),
        const SizedBox(height: 2),
        Text(val, style: GoogleFonts.outfit(fontSize: 13, fontWeight: FontWeight.bold)),
      ],
    );
  }

  void _showCityPicker(BuildContext context, CalendarProvider provider) {
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
            Text('Select Panchang Location',
                style: GoogleFonts.epilogue(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...['New Delhi', 'Mumbai', 'Varanasi', 'Bengaluru', 'Kolkata', 'Ayodhya'].map((city) {
              return ListTile(
                title: Text(city),
                trailing: provider.selectedCity == city ? const Icon(Icons.check, color: AppColors.primary) : null,
                onTap: () {
                  provider.setCity(city);
                  Navigator.pop(context);
                },
              );
            }),
          ],
        ),
      ),
    );
  }
}
