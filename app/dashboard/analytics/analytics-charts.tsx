"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { TimeSeriesData } from "@/lib/types"

interface Props {
  timeseries: TimeSeriesData[]
}

export function AnalyticsCharts({ timeseries }: Props) {
  const chartData = timeseries.length > 0
    ? timeseries.map((d) => ({
      ...d,
      date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }))
    : [
      { date: "Feb 1", sent: 1200, delivered: 1180, opened: 480, clicked: 150, bounced: 20 },
      { date: "Feb 5", sent: 800, delivered: 790, opened: 350, clicked: 100, bounced: 10 },
      { date: "Feb 10", sent: 1500, delivered: 1470, opened: 620, clicked: 200, bounced: 30 },
      { date: "Feb 15", sent: 1100, delivered: 1080, opened: 500, clicked: 170, bounced: 20 },
    ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Email Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="sent" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} name="Sent" />
            <Area type="monotone" dataKey="opened" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.1)" strokeWidth={2} name="Opened" />
            <Area type="monotone" dataKey="clicked" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3) / 0.1)" strokeWidth={2} name="Clicked" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
