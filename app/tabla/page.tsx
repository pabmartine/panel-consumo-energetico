import Layout from "@/components/Layout"
import DataTable from "@/components/DataTable"
import { fetchAndProcessData } from "@/lib/dataUtils"

export default async function TablaPage() {
  const { data } = await fetchAndProcessData()

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Datos de Consumo Energético</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Visualiza los datos de consumo energético</p>
        </div>
        <DataTable initialData={data} />
      </div>
    </Layout>
  )
}

