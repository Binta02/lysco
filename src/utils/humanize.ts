// src/utils/humanizeReservationType.ts
export function humanizeReservationType(raw: string): string {
  // 1) Normalise la chaîne : remplace '-' par ' ' et condense les espaces
  const normalized = raw.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();

  // 2) Cas avec date (YYYY MM DD + créneau EN/FR)
  const dateMatch = normalized.match(
    /^(.+?)\s+\d{4}\s+\d{2}\s+\d{2}\s+(matin|après-midi|morning|afternoon)$/i
  );
  if (dateMatch) {
    let [, slugPart, periodKey] = dateMatch;
    slugPart = slugPart.trim();
    const slugKey = slugPart.toLowerCase().replace(/\s+/g, '-');

    const nameMap: Record<string, string> = {
      'formation-room': 'Salle de formation',
      'location-bureau': 'Location bureau',
      'coworking-space': 'Espace coworking',
      // autres mappings...
    };
    const base = nameMap[slugKey] ?? slugPart;

    const periodMap: Record<string, string> = {
      morning: 'matin',
      afternoon: 'après-midi',
      matin: 'matin',
      'après-midi': 'après-midi',
    };
    const period = periodMap[periodKey.toLowerCase()] ?? periodKey;
    return `${base} ${period}`;
  }

  // 3) Cas sans date, juste slug + créneau FR
  const simpleMatch = normalized.match(
    /^(.+?)\s+(matin|après-midi|journée|journée complète)$/i
  );
  if (simpleMatch) {
    let [, slugPart, periodKey] = simpleMatch;
    slugPart = slugPart.trim();

    const slugKey = slugPart.toLowerCase().replace(/\s+/g, '-');
    const nameMap: Record<string, string> = {
      'formation-room': 'Salle de formation',
      'location-bureau': 'Location bureau',
      'coworking-space': 'Espace coworking',
      // autres mappings...
    };
    const base = nameMap[slugKey] ?? slugPart;

    const periodMap: Record<string, string> = {
      matin: 'matin',
      'après-midi': 'après-midi',
      journée: 'journée',
      'journée complète': 'journée complète',
    };
    const period = periodMap[periodKey.toLowerCase()] ?? periodKey;
    return `${base} ${period}`;
  }

  // Fallback : retourne la version normalisée
  return normalized;
}
