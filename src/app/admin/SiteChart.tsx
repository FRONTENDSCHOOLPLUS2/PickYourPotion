"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/Chart";
import { Bar, BarChart, XAxis } from "recharts";

const chartData = [
  { day: "09/12", 신규주문: 186, 신규회원: 80 },
  { day: "09/13", 신규주문: 305, 신규회원: 200 },
  { day: "09/14", 신규주문: 237, 신규회원: 120 },
  { day: "09/15", 신규주문: 73, 신규회원: 190 },
  { day: "09/16", 신규주문: 209, 신규회원: 130 },
  { day: "09/17", 신규주문: 214, 신규회원: 140 },
];

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
