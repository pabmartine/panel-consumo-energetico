import Layout from "@/components/Layout"
import Charts from "@/components/Charts"
import { fetchAndProcessData } from "@/lib/dataUtils"

export default async function GraficosPage() {
  const { data } = await fetchAndProcessData()

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Análisis de Consumo Energético</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Visualiza y analiza tus patrones de uso de energía</p>
        </div>
        <Charts data={data} />
      </div>
    </Layout>
  )
}

