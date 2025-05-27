import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import LiliumHeader from '../../components/LiliumHeader'

// Simulación de pedidos activos
const PEDIDOS = [
  {
    id: 1,
    estado: 'En proceso',
    cantidad: 3,
    mesa: 5,
    imagen: require('../../assets/images/calamari.jpg'),
    numero: 1,
  },
  {
    id: 2,
    estado: 'Terminado',
    cantidad: 1,
    mesa: 6,
    imagen: require('../../assets/images/calamari.jpg'),
    numero: 2,
  },
  {
    id: 3,
    estado: 'En proceso',
    cantidad: 1,
    mesa: 6,
    imagen: require('../../assets/images/calamari.jpg'),
    numero: 2,
  },
  {
    id: 4,
    estado: 'En proceso',
    cantidad: 1,
    mesa: 6,
    imagen: require('../../assets/images/calamari.jpg'),
    numero: 2,
  },
]

// Simulación de mesas con pedidos
const MESAS = [
  {
    id: 3,
    imagen: require('../../assets/images/mesa.webp'),
    pedidoNumero: 2,
  },
  {
    id: 5,
    imagen: require('../../assets/images/mesa.webp'),
    pedidoNumero: 1,
  },
  {
    id: 6,
    imagen: require('../../assets/images/mesa.webp'),
    pedidoNumero: 2,
  },
]

export default function Pedidos() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <LiliumHeader />
      <View style={{ flex: 1, padding: 16 }}>
        {/* Pedidos pendientes */}
        <Text style={styles.sectionTitle}>Pedidos pendientes</Text>
        <FlatList
          data={PEDIDOS}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, marginBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.pedidoCard}>
              <Image source={item.imagen} style={styles.pedidoImg} />
              <Text style={styles.pedidoText}>
                pedido #{item.numero}{'\n'}
                {item.estado}{'\n'}
                cantidad: {item.cantidad}
              </Text>
            </View>
          )}
        />

        {/* Mesas y número de orden */}
        <Text style={styles.sectionTitle}>Mesas y numero de orden</Text>
        <FlatList
          data={MESAS}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item }) => (
            <View style={styles.mesaCard}>
              <Image source={item.imagen} style={styles.mesaImg} />
              <Text style={styles.mesaText}>Mesa # {item.id}</Text>
              <Text style={styles.mesaPedido}>pedido numero {item.pedidoNumero}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    width: 160,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pedidoImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
  },
  pedidoText: {
    fontSize: 15,
    textAlign: 'left',
  },
  mesaCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    width: 140,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  mesaImg: {
    width: 110,
    height: 70,
    borderRadius: 16,
  },
  mesaText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  mesaPedido: {
    fontSize: 12,
    color: '#666',
  },
})