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
      <div className="bg-popover border border-border/50 p-3 shadow-xl rounded-xl backdrop-blur-md">
        <p className="font-bold text-muted-foreground uppercase tracking-wider text-[10px] mb-1">{label}</p>
        <p className="font-bold text-lg text-foreground">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 stagger-children">
      <Card className="premium-card-static border-none shadow-sm animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader className="border-b pb-4 mb-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Open Rate Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={openRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5' }} />
              <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRate)" strokeWidth={3} activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="premium-card-static border-none shadow-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader className="border-b pb-4 mb-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Click-Through Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={clickRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
              <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}