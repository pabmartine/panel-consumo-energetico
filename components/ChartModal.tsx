import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

interface ChartModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: any[]
  type: "line" | "bar"
  dataKey: string
  color: string
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, title, data, type, dataKey, color }) => {
  const [timeFrame, setTimeFrame] = useState<"monthly" | "yearly">("monthly")
  const [dateRange, setDateRange] = useState<"all" | "lastYear">("all")

  const processData = (rawData: any[], frame: "monthly" | "yearly") => {
    if (frame === "monthly") return rawData

    const yearlyData = rawData.reduce((acc: any[], item) => {
      const year = new Date(item.period.split("/").reverse().join("-")).getFullYear()
      const existingYear = acc.find((d) => d.year === year)
      if (existingYear) {
        existingYear[dataKey] = (existingYear[dataKey] as number) + (item[dataKey] as number)
      } else {
        acc.push({ year, [dataKey]: item[dataKey] })
      }
      return acc
    }, [])
    return yearlyData
  }

  const filterData = (data: any[]) => {
    if (dateRange === "all" || timeFrame === "yearly") return data

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    return data.filter((item) => {
      const itemDate = new Date(item.period.split("/").reverse().join("-"))
      return itemDate >= oneYearAgo
    })
  }

  const processedData = processData(filterData(data), timeFrame)

  const renderChart = () => {
    const ChartComponent = type === "line" ? LineChart : BarChart
    const DataComponent = type === "line" ? Line : Bar

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={timeFrame === "monthly" ? "period" : "year"}
            tickFormatter={(value) =>
              timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
            }
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}`, title]}
            labelFormatter={(label) => (timeFrame === "monthly" ? label : `Año ${label}`)}
          />
          <Legend />
          <DataComponent type="monotone" dataKey={dataKey} name={title} fill={color} stroke={color} />
        </ChartComponent>
      </ResponsiveContainer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center mb-4">
          <Select value={timeFrame} onValueChange={(value: "monthly" | "yearly") => setTimeFrame(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          {timeFrame === "monthly" && (
            <div className="flex space-x-2">
              <Button variant={dateRange === "all" ? "default" : "outline"} onClick={() => setDateRange("all")}>
                Todo
              </Button>
              <Button
                variant={dateRange === "lastYear" ? "default" : "outline"}
                onClick={() => setDateRange("lastYear")}
              >
                Último Año
              </Button>
            </div>
          )}
        </div>
        {renderChart()}
      </DialogContent>
    </Dialog>
  )
}

export default ChartModal

