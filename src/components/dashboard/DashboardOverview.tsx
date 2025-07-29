// src/components/dashboard/DashboardOverview.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { fetchOverviewStats, Stat } from "@/integrations/api/dashboard";

export default function DashboardOverview() {
  // plage par défaut : 7 derniers jours
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data, isLoading, error, refetch } = useQuery<Stat[]>({
    queryKey: ["overviewStats", startDate, endDate],
    queryFn: () => fetchOverviewStats(startDate, endDate),
    refetchInterval: 1000 * 60 * 5, // toutes les 5 minutes
    // keepPreviousData: true, // <-- Supprimez cette ligne, non supportée dans votre version
  });

  const chartData: Stat[] = data ?? [];

  if (isLoading) return <div>Chargement des statistiques…</div>;
  if (error) return <div>Impossible de charger les données.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Filtres de date */}
      <div className="flex items-center gap-4">
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            refetch();
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date);
            refetch();
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      {/* Graphique */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2DD4BF"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
