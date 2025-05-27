import React, { createContext, ReactNode, useContext, useState } from 'react'

// Tipos para producto y mesa
export interface Producto {
  id: string
  nombre: string
  precio: number
  descripcion: string
  tipo: string
  imagen: any
  cantidad: number
}

export interface Mesa {
  id: number
  nombre: string
  imagen: any
}

export interface PedidoEnviado {
  numero: number
  estado: string
  mesa: Mesa | null
  clientes: number
  productos: Producto[]
}

// Tipado del contexto
interface CarritoContextType {
  carrito: Producto[]
  agregarAlCarrito: (producto: Omit<Producto, 'cantidad'>) => void
  editarCantidad: (id: string, cantidad: number) => void
  eliminarProducto: (id: string) => void
  limpiarCarrito: () => void
  mesaSeleccionada: Mesa | null
  setMesaSeleccionada: (mesa: Mesa | null) => void
  enviarPedido: () => void
  pedidoEnviado: PedidoEnviado | null
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null)
  const [pedidoEnviado, setPedidoEnviado] = useState<PedidoEnviado | null>(null)

  const agregarAlCarrito = (producto: Omit<Producto, 'cantidad'>) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const editarCantidad = (id: string, cantidad: number) => {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    )
  }

  const eliminarProducto = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const limpiarCarrito = () => {
    setCarrito([])
    setMesaSeleccionada(null)
    setPedidoEnviado(null)
  }

  const enviarPedido = () => {
    setPedidoEnviado({
      numero: Math.floor(Math.random() * 100) + 1,
      estado: 'En preparacion',
      mesa: mesaSeleccionada,
      clientes: carrito.reduce((acc, p) => acc + p.cantidad, 0),
      productos: carrito,
    })
    setCarrito([])
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        editarCantidad,
        eliminarProducto,
        limpiarCarrito,
        mesaSeleccionada,
        setMesaSeleccionada,
        enviarPedido,
        pedidoEnviado,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return context
}