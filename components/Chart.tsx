"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataItem {
  [key: string]: string | number
}

interface ChartProps {
  data: DataItem[]
  title: string
  dataKey: string
  unit: string
  timeFrame: "monthly" | "yearly"
}

export default function Chart({ data, title, dataKey, unit, timeFrame }: ChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={timeFrame === "monthly" ? "Periodo Fin" : "year"}
              tickFormatter={(value) =>
                timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => (timeFrame === "monthly" ? label : `Año ${label}`)}
              formatter={(value: number) => [value.toFixed(2) + " " + unit, title]}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" name={title} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

