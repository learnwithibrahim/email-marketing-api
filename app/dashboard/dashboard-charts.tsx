"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const openRateData = [
  { name: "Jan", rate: 38 }, { name: "Feb", rate: 42 }, { name: "Mar", rate: 35 },
  { name: "Apr", rate: 47 }, { name: "May", rate: 44 }, { name: "Jun", rate: 50 },
]

const clickRateData = [
  { name: "Jan", rate: 12 }, { name: "Feb", rate: 15 }, { name: "Mar", rate: 11 },
  { name: "Apr", rate: 18 }, { name: "May", rate: 16 }, { name: "Jun", rate: 20 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-[3px] border-[#2e2692] p-3 shadow-[4px_4px_0px_0px_#2e2692] rounded-xl">
        <p className="font-extrabold text-[#2e2692] uppercase tracking-wider text-[12px] mb-1">{label}</p>
        <p className="font-black text-xl text-[#120f3a]">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="border-b-[3px] border-[#2e2692] pb-4 mb-4">
          <CardTitle>Open Rate (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={openRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 700, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 13, fontWeight: 700, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2e2692', strokeWidth: 2, strokeDasharray: '5 5' }} />
              <Area type="monotone" dataKey="rate" stroke="#2e2692" fill="#22c55e" fillOpacity={0.2} strokeWidth={4} activeDot={{ r: 8, fill: '#2e2692', stroke: '#fff', strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b-[3px] border-[#2e2692] pb-4 mb-4">
          <CardTitle>Click Rate (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={clickRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 700, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 13, fontWeight: 700, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="rate" fill="#2e2692" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}