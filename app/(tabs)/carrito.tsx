import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LiliumHeader from '../../components/LiliumHeader'
import { useCarrito } from '../../context/CarritoContext'

const MESAS = [
  { id: 1, nombre: 'Mesa 1', imagen: require('../../assets/images/mesa.webp') },
  { id: 2, nombre: 'Mesa 2', imagen: require('../../assets/images/mesa.webp') },
  { id: 3, nombre: 'Mesa 3', imagen: require('../../assets/images/mesa.webp') },
  { id: 6, nombre: 'Mesa 6', imagen: require('../../assets/images/mesa.webp') },
]

export default function Carrito() {
  const {
    carrito,
    editarCantidad,
    eliminarProducto,
    limpiarCarrito,
    mesaSeleccionada,
    setMesaSeleccionada,
    enviarPedido,
    pedidoEnviado,
  } = useCarrito()
  const router = useRouter()
  const [enviado, setEnviado] = useState(false)

  if (pedidoEnviado) {
    // Pantalla de confirmación
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <LiliumHeader />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
            El pedido n.º {pedidoEnviado.numero} ha sido enviado
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 24 }}>
            Ahora puede ver el estado del pedido en el panel de cocina. Aquí aparecerán actualizaciones a medida que avanza la preparación.
          </Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Estado</Text>
            <Text style={styles.infoValue}>{pedidoEnviado.estado}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Mesa</Text>
            <Text style={styles.infoValue}>{pedidoEnviado.mesa?.nombre || '-'}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Clientes</Text>
            <Text style={styles.infoValue}>{pedidoEnviado.clientes}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => {
              limpiarCarrito()
              router.replace('/(tabs)/inicio')
            }}
          >
            <Text style={styles.btnConfirmText}>volver al menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <LiliumHeader />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Crear Pedido</Text>
        {/* Lista de productos */}
        <FlatList
          data={carrito}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productoCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.imagen} style={styles.productoImg} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
                  <Text style={{ color: '#7c2bc0' }}>${item.precio}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ color: '#888', marginRight: 4 }}>cantidad:</Text>
                    <TextInput
                      style={styles.inputCantidad}
                      keyboardType="numeric"
                      value={item.cantidad.toString()}
                      onChangeText={(text) => {
                        const val = parseInt(text) || 1
                        editarCantidad(item.id, val)
                      }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
                <Text style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888' }}>No hay productos en el carrito.</Text>}
        />
        {/* Selección de mesa */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Selecciona la mesa</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {MESAS.map((mesa) => (
            <TouchableOpacity
              key={mesa.id}
              style={[
                styles.mesaCard,
                mesaSeleccionada?.id === mesa.id && styles.mesaCardSelected,
              ]}
              onPress={() => setMesaSeleccionada(mesa)}
            >
              <Image source={mesa.imagen} style={styles.mesaImg} />
              <Text style={{ fontWeight: 'bold', marginTop: 8 }}>{mesa.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Botones */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
          <TouchableOpacity style={styles.btnSecundario} onPress={limpiarCarrito}>
            <Text style={styles.btnSecundarioText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFactura}
            onPress={() => {
              // Aquí podrías implementar la lógica de factura
              alert('Funcionalidad de factura no implementada')
            }}
          >
            <Text style={styles.btnFacturaText}>Enviar factura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrincipal}
            disabled={!carrito.length || !mesaSeleccionada}
            onPress={() => enviarPedido()}
          >
            <Text style={styles.btnPrincipalText}>Enviar orden</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productoCard: {
    backgroundColor: '#fcf9f6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productoImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  inputCantidad: {
    borderWidth: 2,
    borderColor: '#a259d9',
    borderRadius: 8,
    width: 48, // más ancho
    height: 32, // más alto
    textAlign: 'center',
    marginLeft: 4,
    backgroundColor: '#fff',
    color: '#222', // texto oscuro
    fontWeight: 'bold',
    fontSize: 16, // más grande
  },
  mesaCard: {
    backgroundColor: '#fcf9f6',
    borderRadius: 8,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0d0e7',
  },
  mesaCardSelected: {
    borderColor: '#7c2bc0',
    borderWidth: 2,
  },
  mesaImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  btnSecundario: {
    backgroundColor: '#f3ede7',
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  btnSecundarioText: {
    color: '#222',
    fontWeight: 'bold',
  },
  btnFactura: {
    backgroundColor: '#b89cf7',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  btnFacturaText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnPrincipal: {
    backgroundColor: '#a259d9',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    opacity: 1,
  },
  btnPrincipalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fcf9f6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '90%',
    alignSelf: 'center',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoValue: {
    color: '#a259d9',
    fontSize: 16,
    marginTop: 4,
  },
  btnConfirm: {
    backgroundColor: '#b89cf7',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    minWidth: 180,
    alignItems: 'center',
  },
  btnConfirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})