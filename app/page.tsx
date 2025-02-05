import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAndProcessData } from "@/lib/dataUtils"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"

export default async function Home() {
  const { data, changes } = await fetchAndProcessData()

  const currentPeriod = data[data.length - 1]
  const previousPeriod =
    data.find((item) => {
      const currentEndDate = new Date(currentPeriod["Periodo Fin"].split("/").reverse().join("-"))
      const itemEndDate = new Date(item["Periodo Fin"].split("/").reverse().join("-"))
      return (
        itemEndDate.getMonth() === currentEndDate.getMonth() &&
        itemEndDate.getFullYear() === currentEndDate.getFullYear() - 1
      )
    }) || data[data.length - 2]

  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  const calculateEfficiency = (item: any) => {
    const totalEnergy =
      Number(item["Consumo Agua (m³)"]) +
      Number(item["Consumo Energia Calor (MWh)"]) +
      Number(item["Consumo Energia Frio (MWh)"])
    return totalEnergy > 0 ? Number(item["Costo Total (€)"]) / totalEnergy : 0
  }

  const currentEfficiency = calculateEfficiency(currentPeriod)
  const previousEfficiency = calculateEfficiency(previousPeriod)
  const efficiencyChange = ((currentEfficiency - previousEfficiency) / previousEfficiency) * 100

  const renderCard = (title: string, field: string, unit: string, isConsumption = false) => {
    const changeData = changes[field]
    if (!changeData) {
      return null // Skip rendering this card if data is not available
    }

    const { current, previous, change } = changeData
    const changeIsPositive = change > 0
    const changeColor = isConsumption
      ? changeIsPositive
        ? "text-red-500"
        : "text-green-500"
      : changeIsPositive
        ? "text-green-500"
        : "text-red-500"

    return (
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {changeIsPositive ? (
            <ArrowUp className={`h-4 w-4 ${changeColor}`} />
          ) : (
            <ArrowDown className={`h-4 w-4 ${changeColor}`} />
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl text-muted-foreground">{previous.toFixed(2)}</span>
            {changeIsPositive ? (
              <TrendingUp className={`h-5 w-5 ${changeColor}`} />
            ) : (
              <TrendingDown className={`h-5 w-5 ${changeColor}`} />
            )}
            <span className="text-2xl font-bold">{current.toFixed(2)}</span>
            <span className="text-sm font-medium">{unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatChange(change)} comparado con {previousPeriod["Periodo Fin"]}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Panel de Consumo Energético</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comparando {currentPeriod["Periodo Fin"]} con {previousPeriod["Periodo Fin"]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            ["Consumo de Agua", "Consumo Agua (m³)", "m³", true],
            ["Costo de Agua", "Costo Agua (€)", "€"],
            ["Consumo de Calefacción", "Consumo Energia Calor (MWh)", "MWh", true],
            ["Costo de Calefacción", "Costo Energia Calor (€)", "€"],
            ["Consumo de Refrigeración", "Consumo Energia Frio (MWh)", "MWh", true],
            ["Costo de Refrigeración", "Costo Energia Frio (€)", "€"],
            ["Fijo Encendido Caldera ACS", "Fijo Encendido Caldera ACS (€)", "€"],
            ["Fijo Encendido Caldera Calefacción", "Fijo Encendido Caldera Calefacción (€)", "€"],
            ["Cuota de Servicio", "Cuota Servicio (€)", "€"],
            ["Costo Total", "Costo Total (€)", "€"],
          ]
            .map(([title, field, unit, isConsumption]) => renderCard(title, field, unit, isConsumption))
            .filter(Boolean)}

          {/* Nueva tarjeta de Eficiencia Energética */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiencia Energética</CardTitle>
              {efficiencyChange > 0 ? (
                <ArrowUp className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl text-muted-foreground">{previousEfficiency.toFixed(2)}</span>
                {efficiencyChange > 0 ? (
                  <TrendingUp className="h-5 w-5 text-red-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-green-500" />
                )}
                <span className="text-2xl font-bold">{currentEfficiency.toFixed(2)}</span>
                <span className="text-sm font-medium">€/unidad</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatChange(efficiencyChange)} comparado con {previousPeriod["Periodo Fin"]}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

