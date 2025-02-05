import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gestión de Facturas",
  description: "Una aplicación moderna para la gestión y visualización de datos de facturas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'