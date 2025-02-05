"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, PlusCircle, MinusCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface FormData {
  [key: string]: string | Date
}

export default function DataForm() {
  const { register, handleSubmit, reset, control } = useForm<FormData>()
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Aquí normalmente enviarías los datos al backend o actualizarías el estado
    reset()
    setIsOpen(false)
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Añadir Nuevo Consumo de Energía</span>
          <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
            {isOpen ? <MinusCircle className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroRecibo">Número de Factura</Label>
                <Input id="numeroRecibo" {...register("Número de recibo")} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="periodoInicio">Inicio del Periodo de Facturación</Label>
                <Controller
                  name="Periodo de facturación (inicio)"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value as Date, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="periodoFin">Fin del Periodo de Facturación</Label>
                <Controller
                  name="Periodo de facturación (fin)"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value as Date, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          locale={es}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="consumoAgua">Consumo de Agua Caliente (m³)</Label>
                <Input
                  id="consumoAgua"
                  type="number"
                  step="0.01"
                  {...register("Consumo Agua Caliente (m³)")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="costoAgua">Costo de Agua Caliente (€)</Label>
                <Input
                  id="costoAgua"
                  type="number"
                  step="0.01"
                  {...register("Costo Agua Caliente (€)")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="consumoCalor">Consumo de Energía de Calefacción (MWh)</Label>
                <Input
                  id="consumoCalor"
                  type="number"
                  step="0.001"
                  {...register("Consumo Energía Calor (MWh)")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="costoCalor">Costo de Energía de Calefacción (€)</Label>
                <Input
                  id="costoCalor"
                  type="number"
                  step="0.01"
                  {...register("Costo Energía Calor (€)")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="consumoFrio">Consumo de Energía de Refrigeración (MWh)</Label>
                <Input
                  id="consumoFrio"
                  type="number"
                  step="0.001"
                  {...register("Consumo Energía Frío (MWh)")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="costoFrio">Costo de Energía de Refrigeración (€)</Label>
                <Input
                  id="costoFrio"
                  type="number"
                  step="0.01"
                  {...register("Costo Energía Frío (€)")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cuotaServicio">Cuota de Servicio (€)</Label>
                <Input
                  id="cuotaServicio"
                  type="number"
                  step="0.01"
                  {...register("Cuota Servicio (€)")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fijoACS">Fijo Encendido Caldera ACS (€)</Label>
                <Input
                  id="fijoACS"
                  type="number"
                  step="0.01"
                  {...register("Fijo Encendido Caldera ACS (€)")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fijoCalefaccion">Fijo Encendido Caldera Calefacción/Frío (€)</Label>
                <Input
                  id="fijoCalefaccion"
                  type="number"
                  step="0.01"
                  {...register("Fijo Encendido Caldera Calefacción/Frío (€)")}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="costoTotal">Costo Total (€)</Label>
                <Input
                  id="costoTotal"
                  type="number"
                  step="0.01"
                  {...register("Costo Total (€)")}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

