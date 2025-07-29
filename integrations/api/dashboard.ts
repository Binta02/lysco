// src/integrations/api/dashboard.ts
export interface Stat {
  date: string
  value: number
}

export async function fetchOverviewStats(start: Date, end: Date): Promise<Stat[]> {
  const res = await fetch(
    `/api/dashboard/overview?start=${start.toISOString()}&end=${end.toISOString()}`
  )
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des statistiques')
  }
  return res.json()
}
