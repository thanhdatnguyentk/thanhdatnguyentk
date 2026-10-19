/**
 * Cohesive PBR Material Palette for "THE AI ENGINEER'S ATELIER"
 * Designed so surfaces remain rich, tactile, and sculptural in both
 * Studio Daylight and Atmospheric Night Lab modes (never crushed black or blown out).
 */

export interface AtelierMaterialSet {
  wallMain: string;
  wallTrim: string;
  wallInnerAccent: string;
  floorBase: string;
  plankA: string;
  plankB: string;
  plinthUpper: string;
  plinthLower: string;
  plinthRim: string;
  rugOuter: string;
  rugInner: string;
  woodWarm: string;
  woodTrim: string;
  woodSlat: string;
  metalBrushed: string;
  metalDark: string;
  metalSilver: string;
  ceramicWhite: string;
  fabricSlate: string;
  foliagePrimary: string;
  foliageSecondary: string;
  accentCyan: string;
  accentLavender: string;
  accentAmber: string;
  accentEmerald: string;
}

export const ATELIER_PALETTE: Record<'day' | 'night', AtelierMaterialSet> = {
  night: {
    // Rich architectural slate-navy walls with distinct warm walnut wood contrast
    wallMain: '#243452',
    wallTrim: '#18243a',
    wallInnerAccent: '#2d4066',
    floorBase: '#162136',
    plankA: '#23324f',
    plankB: '#1d2b44',
    plinthUpper: '#182338',
    plinthLower: '#0f1726',
    plinthRim: '#7ddcf7',
    rugOuter: '#283959',
    rugInner: '#1b2842',
    woodWarm: '#8b4e24',
    woodTrim: '#6c3a18',
    woodSlat: '#9e5a2b',
    metalBrushed: '#32425e',
    metalDark: '#1c263b',
    metalSilver: '#94a3b8',
    ceramicWhite: '#e2e8f0',
    fabricSlate: '#2e3f5c',
    foliagePrimary: '#10b981',
    foliageSecondary: '#059669',
    accentCyan: '#7ddcf7',
    accentLavender: '#ac98ff',
    accentAmber: '#ffc992',
    accentEmerald: '#34d399',
  },
  day: {
    // Warm architectural sandstone/oak miniature studio daylight (rich midtones, never blown out)
    wallMain: '#d8cbb8',
    wallTrim: '#b8a68e',
    wallInnerAccent: '#cbbba4',
    floorBase: '#b3926e',
    plankA: '#ad845a',
    plankB: '#9c744b',
    plinthUpper: '#334155',
    plinthLower: '#1e293b',
    plinthRim: '#d97706',
    rugOuter: '#94a3b8',
    rugInner: '#64748b',
    woodWarm: '#7c431e',
    woodTrim: '#5c3014',
    woodSlat: '#8f5026',
    metalBrushed: '#334155',
    metalDark: '#1e293b',
    metalSilver: '#94a3b8',
    ceramicWhite: '#e2e8f0',
    fabricSlate: '#334155',
    foliagePrimary: '#059669',
    foliageSecondary: '#047857',
    accentCyan: '#0284c7',
    accentLavender: '#7c3aed',
    accentAmber: '#d97706',
    accentEmerald: '#059669',
  },
};
