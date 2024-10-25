"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/Chart";
import { Bar, BarChart, XAxis } from "recharts";
import { useState, useEffect } from "react";

interface ChartData {
  day: string;
  신규주문: number;
  신규회원: number;
}

function generateChartData(): ChartData[] {
  const chartData: ChartData[] = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = `${date.getMonth() + 1}/${String(date.getDate()).padStart(2, "0")}`;
    const 신규주문 = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const 신규회원 = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    chartData.push({ day, 신규주문, 신규회원 });
  }

  return chartData;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#F29963",
  },
  mobile: {
    label: "Mobile",
    color: "#fabf9a",
  },
} satisfies ChartConfig;

function SiteChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    setChartData(generateChartData());
  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="신규주문" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="신규회원" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default SiteChart;
