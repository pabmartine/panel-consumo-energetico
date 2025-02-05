import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FormData {
  [key: string]: string | number
}

interface NewEntryFormProps {
  onSubmit: (data: FormData) => void
}

export default function NewEntryForm({ onSubmit }: NewEntryFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      "Periodo Inicio": startDate ? format(startDate, "dd/MM/yyyy") : "",
      "Periodo Fin": endDate ? format(endDate, "dd/MM/yyyy") : "",
    })
    reset()
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Añadir Nueva Entrada</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numeroRecibo">Número de Recibo</Label>
              <Input id="numeroRecibo" {...register("Numero Recibo")} required />
            </div>
            <div>
              <Label>Inicio del Periodo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} locale={es} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Fin del Periodo</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} locale={es} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="consumoAgua">Consumo de Agua (m³)</Label>
              <Input id="consumoAgua" type="number" step="0.01" {...register("Consumo Agua (m³)")} required />
            </div>
            <div>
              <Label htmlFor="costoAgua">Costo de Agua (€)</Label>
              <Input id="costoAgua" type="number" step="0.01" {...register("Costo Agua (€)")} required />
            </div>
            <div>
              <Label htmlFor="consumoCalor">Consumo de Energía Calor (MWh)</Label>
              <Input
                id="consumoCalor"
                type="number"
                step="0.001"
                {...register("Consumo Energia Calor (MWh)")}
                required
              />
            </div>
            <div>
              <Label htmlFor="costoCalor">Costo de Energía Calor (€)</Label>
              <Input id="costoCalor" type="number" step="0.01" {...register("Costo Energia Calor (€)")} required />
            </div>
            <div>
              <Label htmlFor="consumoFrio">Consumo de Energía Frío (MWh)</Label>
              <Input id="consumoFrio" type="number" step="0.001" {...register("Consumo Energia Frio (MWh)")} required />
            </div>
            <div>
              <Label htmlFor="costoFrio">Costo de Energía Frío (€)</Label>
              <Input id="costoFrio" type="number" step="0.01" {...register("Costo Energia Frio (€)")} required />
            </div>
            <div>
              <Label htmlFor="fijoACS">Fijo Encendido Caldera ACS (€)</Label>
              <Input id="fijoACS" type="number" step="0.01" {...register("Fijo Encendido Caldera ACS (€)")} required />
            </div>
            <div>
              <Label htmlFor="fijoCalefaccion">Fijo Encendido Caldera Calefacción (€)</Label>
              <Input
                id="fijoCalefaccion"
                type="number"
                step="0.01"
                {...register("Fijo Encendido Caldera Calefacción (€)")}
                required
              />
            </div>
            <div>
              <Label htmlFor="cuotaServicio">Cuota de Servicio (€)</Label>
              <Input id="cuotaServicio" type="number" step="0.01" {...register("Cuota Servicio (€)")} required />
            </div>
            <div>
              <Label htmlFor="costoTotal">Costo Total (€)</Label>
              <Input id="costoTotal" type="number" step="0.01" {...register("Costo Total (€)")} required />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Añadir Entrada
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

