"use client"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Table, Battery } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-full flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Battery className="h-6 w-6 mr-2" />
                <span className="font-medium text-lg">Panel de Energía</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/")
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Home className="h-5 w-5 mr-2" />
                <span>Inicio</span>
              </Link>
              <Link
                href="/graficos"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/graficos")
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <BarChart2 className="h-5 w-5 mr-2" />
                <span>Gráficos</span>
              </Link>
              <Link
                href="/tabla"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/tabla")
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Table className="h-5 w-5 mr-2" />
                <span>Tabla</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  )
}

