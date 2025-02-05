"use client"

import { useState } from "react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataItem {
  [key: string]: string | number
}

interface ChartsProps {
  data: DataItem[]
}

const COLORS = {
  water: "#3b82f6", // azul (sin cambios)
  heat: "#ef4444", // rojo (cambiado de naranja)
  cold: "#eab308", // amarillo mostaza (cambiado de amarillo brillante)
  fixed: "#8b5cf6", // violeta (sin cambios)
  service: "#10b981", // verde (sin cambios)
  total: "#8b5cf6", // violeta (cambiado de rojo)
}

export default function Charts({ data }: ChartsProps) {
  const [timeFrame, setTimeFrame] = useState("monthly")

  const processData = (rawData: DataItem[], frame: string) => {
    if (frame === "monthly") return rawData

    const yearlyData = rawData.reduce((acc: DataItem[], item) => {
      const year = new Date(item["Periodo Fin"].split("/").reverse().join("-")).getFullYear()
      const existingYear = acc.find((d) => d.year === year)
      if (existingYear) {
        Object.keys(item).forEach((key) => {
          if (typeof item[key] === "number") {
            existingYear[key] = (existingYear[key] as number) + (item[key] as number)
          }
        })
      } else {
        acc.push({ ...item, year })
      }
      return acc
    }, [])
    return yearlyData
  }

  const processedData = processData(data || [], timeFrame);

  // Datos para las gráficas individuales
  const waterConsumptionData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Consumo Agua (m³)"],
  }))

  const heatConsumptionData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Consumo Energia Calor (MWh)"],
  }))

  const coldConsumptionData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Consumo Energia Frio (MWh)"],
  }))

  const waterCostData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Costo Agua (€)"],
  }))

  const heatCostData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Costo Energia Calor (€)"],
  }))

  const coldCostData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    value: item["Costo Energia Frio (€)"],
  }))

  // Datos para las gráficas existentes
  const consumptionData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    agua: item["Consumo Agua (m³)"],
    calor: item["Consumo Energia Calor (MWh)"],
    frio: item["Consumo Energia Frio (MWh)"],
  }))

  const costData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    agua: item["Costo Agua (€)"],
    calor: item["Costo Energia Calor (€)"],
    frio: item["Costo Energia Frio (€)"],
    total: item["Costo Total (€)"],
  }))

  const distributionData = [
    { name: "Agua", value: processedData.reduce((sum, item) => sum + Number(item["Costo Agua (€)"]), 0) },
    { name: "Calor", value: processedData.reduce((sum, item) => sum + Number(item["Costo Energia Calor (€)"]), 0) },
    { name: "Frío", value: processedData.reduce((sum, item) => sum + Number(item["Costo Energia Frio (€)"]), 0) },
    {
      name: "Fijo ACS",
      value: processedData.reduce((sum, item) => sum + Number(item["Fijo Encendido Caldera ACS (€)"]), 0),
    },
    {
      name: "Fijo Calefacción",
      value: processedData.reduce((sum, item) => sum + Number(item["Fijo Encendido Caldera Calefacción (€)"]), 0),
    },
    { name: "Cuota Servicio", value: processedData.reduce((sum, item) => sum + Number(item["Cuota Servicio (€)"]), 0) },
  ]

  const consumptionEvolution = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    "Consumo Total":
      Number(item["Consumo Agua (m³)"]) +
      Number(item["Consumo Energia Calor (MWh)"]) +
      Number(item["Consumo Energia Frio (MWh)"]),
  }))

  const costEvolution = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    "Costo Total": Number(item["Costo Total (€)"]),
  }))

  const calculateEfficiency = (item: DataItem) => {
    const totalEnergy =
      Number(item["Consumo Agua (m³)"]) +
      Number(item["Consumo Energia Calor (MWh)"]) +
      Number(item["Consumo Energia Frio (MWh)"])
    return totalEnergy > 0 ? Number(item["Costo Total (€)"]) / totalEnergy : 0
  }

  const efficiencyData = (processedData || []).map((item) => ({
    period: timeFrame === "monthly" ? item["Periodo Fin"] : item.year,
    "Eficiencia (€/unidad)": calculateEfficiency(item),
  }))

  const renderLineChart = (data: any[], title: string, unit: string, color: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              tickFormatter={(value) =>
                timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
              }
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)} ${unit}`, title]}
              labelFormatter={(label) => (timeFrame === "monthly" ? label : `Año ${label}`)}
            />
            <Legend />
            <Line type="monotone" dataKey="value" name={title} stroke={color} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select onValueChange={setTimeFrame} defaultValue={timeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensual</SelectItem>
            <SelectItem value="yearly">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gráficas individuales */}
        {renderLineChart(waterConsumptionData, "Consumo de Agua", "m³", COLORS.water)}
        {renderLineChart(heatConsumptionData, "Consumo de Energía Calor", "MWh", COLORS.heat)}
        {renderLineChart(coldConsumptionData, "Consumo de Energía Frío", "MWh", COLORS.cold)}
        {renderLineChart(waterCostData, "Costo de Agua", "€", COLORS.water)}
        {renderLineChart(heatCostData, "Costo de Energía Calor", "€", COLORS.heat)}
        {renderLineChart(coldCostData, "Costo de Energía Frío", "€", COLORS.cold)}

        {/* Gráficas existentes */}
        <Card>
          <CardHeader>
            <CardTitle>Consumo por Tipo de Energía</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) =>
                    timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agua" name="Agua (m³)" fill={COLORS.water} />
                <Bar dataKey="calor" name="Calor (MWh)" fill={COLORS.heat} />
                <Bar dataKey="frio" name="Frío (MWh)" fill={COLORS.cold} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costo por Tipo de Energía</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) =>
                    timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agua" name="Agua" fill={COLORS.water} />
                <Bar dataKey="calor" name="Calor" fill={COLORS.heat} />
                <Bar dataKey="frio" name="Frío" fill={COLORS.cold} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución Total de Costos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Agua"
                          ? COLORS.water
                          : entry.name === "Calor"
                            ? COLORS.heat
                            : entry.name === "Frío"
                              ? COLORS.cold
                              : entry.name.includes("Fijo")
                                ? COLORS.fixed
                                : entry.name === "Cuota Servicio"
                                  ? COLORS.service
                                  : COLORS.total
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolución del Consumo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consumptionEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) =>
                    timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Consumo Total" stroke={COLORS.total} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolución del Costo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) =>
                    timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Costo Total" stroke={COLORS.total} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eficiencia Energética</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) =>
                    timeFrame === "monthly" ? value.split("/")[1] + "/" + value.split("/")[2] : value
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Eficiencia (€/unidad)" stroke={COLORS.service} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

