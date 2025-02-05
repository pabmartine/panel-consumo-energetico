import Layout from "@/components/Layout"
import Charts from "@/components/Charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChartsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Análisis de Consumo Energético</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Visualiza y analiza tus patrones de uso de energía</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Consumo por Tipo de Energía</CardTitle>
            </CardHeader>
            <CardContent>
              <Charts type="consumption" />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Costo por Tipo de Energía</CardTitle>
            </CardHeader>
            <CardContent>
              <Charts type="cost" />
            </CardContent>
          </Card>
          <Card className="md:col-span-2 bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Distribución Total de Costos</CardTitle>
            </CardHeader>
            <CardContent>
              <Charts type="distribution" />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

