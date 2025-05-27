import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LiliumHeader from '../../components/LiliumHeader'

const cocinero = {
  nombre: 'Stefany Cortes Cortes',
  rol: 'Cocinera',
  foto: require('../../assets/images/mesero.png'),
}

// Datos simulados
const PEDIDOS_PENDIENTES = [
  { numero: 4, cantidad: 4, mesa: 3, imagen: require('../../assets/images/mesa.webp') },
  { numero: 2, cantidad: 4, mesa: 1, imagen: require('../../assets/images/mesa.webp') },
  { numero: 1, cantidad: 4, mesa: 2, imagen: require('../../assets/images/mesa.webp') },
  { numero: 6, cantidad: 4, mesa: 4, imagen: require('../../assets/images/mesa.webp') },
]

const PEDIDOS_ENTREGADOS = [
  { numero: 1, cantidad: 4 },
  { numero: 2, cantidad: 3 },
  { numero: 3, cantidad: 5 },
  { numero: 30, cantidad: 5 },
  { numero: 34, cantidad: 1 },
]

export default function Cocina() {
  const [tab, setTab] = useState<'pendientes' | 'entregados'>('pendientes')

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <LiliumHeader />
      <View style={styles.container}>
        <Text style={styles.bienvenida}>Bienvenido, Cocinero.</Text>
        <Image source={cocinero.foto} style={styles.avatar} />
        <Text style={styles.nombre}>{cocinero.nombre}</Text>
        <Text style={styles.rol}>{cocinero.rol}</Text>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'pendientes' && styles.tabBtnActive]}
            onPress={() => setTab('pendientes')}
          >
            <Text style={[styles.tabText, tab === 'pendientes' && styles.tabTextActive]}>
              Pedidos pendientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'entregados' && styles.tabBtnActive]}
            onPress={() => setTab('entregados')}
          >
            <Text style={[styles.tabText, tab === 'entregados' && styles.tabTextActive]}>
              Pedidos entregados
            </Text>
          </TouchableOpacity>
        </View>
        {/* Lista de pedidos */}
        {tab === 'pendientes' ? (
          <FlatList
            key={'pendientes'} // <-- clave única
            data={PEDIDOS_PENDIENTES}
            keyExtractor={item => item.numero.toString()}
            numColumns={2}
            contentContainerStyle={{ gap: 16, marginTop: 10 }}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            renderItem={({ item }) => (
              <View style={styles.pedidoCard}>
                <Image source={item.imagen} style={styles.pedidoImg} />
                <Text style={styles.pedidoInfo}>
                  Orden numero {item.numero}{'\n'}
                  cantidad:{item.cantidad}{'\n'}
                  mesa:{item.mesa}
                </Text>
                <TouchableOpacity style={styles.estadoBtn}>
                  <Text style={styles.estadoBtnText}>Terminado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.estadoBtn}>
                  <Text style={styles.estadoBtnText}>Entregado</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <FlatList
            key={'entregados'}
            data={PEDIDOS_ENTREGADOS}
            keyExtractor={item => item.numero.toString()}
            contentContainerStyle={{ gap: 12, marginTop: 10, paddingHorizontal: 4 }}
            renderItem={({ item }) => (
              <View style={styles.entregadoCard}>
                <Text style={styles.entregadoInfo}>
                  Orden numero {item.numero}
                </Text>
                <Text style={styles.entregadoCantidad}>
                  Cantidad: {item.cantidad}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 5,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  rol: {
    color: '#7c2bc0',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e9eef7',
    borderRadius: 12,
    marginVertical: 12,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#dde3ee',
  },
  tabText: {
    color: '#7c8ca0',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#222',
  },
  pedidoCard: {
    backgroundColor: '#f7fafd',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '47%',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  pedidoImg: {
    width: 120,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  pedidoInfo: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  estadoBtn: {
    backgroundColor: '#b7cbe7',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginVertical: 2,
  },
  estadoBtnText: {
    color: '#222',
    fontWeight: 'bold',
  },
  entregadoCard: {
    backgroundColor: '#f7fafd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%', // Aprovecha casi todo el ancho
    alignSelf: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  entregadoInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  entregadoCantidad: {
    color: '#7c8ca0',
    fontSize: 15,
    textAlign: 'right',
    flex: 1,
  },
})