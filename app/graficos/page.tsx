import { Suspense } from "react"
import Layout from "@/components/Layout"
import Charts from "@/components/Charts"
import { fetchAndProcessData } from "@/lib/dataUtils"
import { Card, CardContent } from "@/components/ui/card"

async function ChartsWithData() {
  const { data } = await fetchAndProcessData()
  return <Charts initialData={data} />
}

export default function GraficosPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Análisis de Consumo Energético</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Visualiza y analiza tus patrones de uso de energía</p>
        </div>
        <Suspense fallback={<LoadingState />}>
          <ChartsWithData />
        </Suspense>
      </div>
    </Layout>
  )
}

function LoadingState() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-96">
        <div className="text-2xl font-semibold text-gray-500">Cargando gráficos...</div>
      </CardContent>
    </Card>
  )
}

