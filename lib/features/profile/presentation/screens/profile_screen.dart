import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../../core/constants/app_assets.dart';
import '../../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Text(
          'Profile & Preferences',
          style: GoogleFonts.epilogue(
            fontSize: 19,
            fontWeight: FontWeight.bold,
            color: AppColors.primary,
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: CircleAvatar(
              radius: 40,
              backgroundImage: const NetworkImage(AppAssets.profileAvatar),
            ),
          ),
          const SizedBox(height: 10),
          Center(
            child: Text(
              'Namrata Chavan',
              style: GoogleFonts.epilogue(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ),
          Center(
            child: Text(
              'namrata.chavan161197@gmail.com',
              style: GoogleFonts.outfit(color: AppColors.onSurfaceVariant),
            ),
          ),
          const SizedBox(height: 24),
          const ListTile(
            leading: Icon(Icons.location_city, color: AppColors.primary),
            title: Text('Panchang Location'),
            subtitle: Text('New Delhi (IST UTC+5:30)'),
            trailing: Icon(Icons.arrow_forward_ios, size: 14),
          ),
          const ListTile(
            leading: Icon(Icons.notifications, color: AppColors.primary),
            title: Text('Muhurat Alarms & Reminders'),
            subtitle: Text('30 mins before Pradosh Kaal'),
            trailing: Icon(Icons.arrow_forward_ios, size: 14),
          ),
          const ListTile(
            leading: Icon(Icons.language, color: AppColors.primary),
            title: Text('Language'),
            subtitle: Text('English (with Sanskrit / Hindi tithi)'),
            trailing: Icon(Icons.arrow_forward_ios, size: 14),
          ),
          const ListTile(
            leading: Icon(Icons.palette_outlined, color: AppColors.primary),
            title: Text('Festive Theme'),
            subtitle: Text('Modern Festive Luxe (Sandstone & Gold)'),
            trailing: Icon(Icons.arrow_forward_ios, size: 14),
          ),
        ],
      ),
    );
  }
}
