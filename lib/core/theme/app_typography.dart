import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Utsav Typographic Hierarchy: Epilogue (Headlines) & Outfit (Prose/Labels)
class AppTypography {
  AppTypography._();

  static TextStyle displayHero = GoogleFonts.epilogue(
    fontSize: 34,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.01,
    color: AppColors.onSurface,
  );

  static TextStyle headlineLarge = GoogleFonts.epilogue(
    fontSize: 28,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.01,
    color: AppColors.onSurface,
  );

  static TextStyle headlineMedium = GoogleFonts.epilogue(
    fontSize: 22,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    color: AppColors.onSurface,
  );

  static TextStyle headlineSmall = GoogleFonts.epilogue(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    color: AppColors.onSurface,
  );

  static TextStyle titleMedium = GoogleFonts.outfit(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0,
    color: AppColors.onSurface,
  );

  static TextStyle bodyLarge = GoogleFonts.outfit(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.01,
    color: AppColors.onSurface,
  );

  static TextStyle bodyMedium = GoogleFonts.outfit(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.01,
    color: AppColors.onSurface,
  );

  static TextStyle labelLarge = GoogleFonts.outfit(
    fontSize: 13,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.04,
    color: AppColors.onSurface,
  );

  static TextStyle labelSmall = GoogleFonts.outfit(
    fontSize: 11,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.06,
    color: AppColors.onSurfaceVariant,
  );
}
