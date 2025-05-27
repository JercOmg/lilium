import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LiliumHeader from '../../components/LiliumHeader'
import { useCarrito } from '../../context/CarritoContext'

// Simulación de datos del mesero
const mesero = {
  nombre: 'Stef Cortes Cortes',
  rol: 'Mesera.',
  foto: require('../../assets/images/mesero.png'), // Cambia la ruta por tu imagen
}

// Simulación de platos (puedes reemplazar esto por datos de una API en el futuro)
const PLATOS = [
  {
    id: '1',
    nombre: 'Crispy Calamari',
    precio: 12.99,
    descripcion: 'Tender calamari, lightly fried, served with a tangy marinara sauce.',
    tipo: 'Entradas',
    imagen: require('../../assets/images/calamari.jpg'), // Cambia la ruta por tu imagen
  },
  {
    id: '2',
    nombre: 'Stuffed Mushrooms',
    precio: 9.99,
    descripcion: 'Mushroom caps filled with a savory blend of herbs and cheese, baked to perfection.',
    tipo: 'Entradas',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '3',
    nombre: 'Grilled Salmon',
    precio: 18.99,
    descripcion: 'Fresh salmon fillet, grilled and topped with a lemon-dill sauce.',
    tipo: 'Platos fuertes',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '4',
    nombre: 'Chicken Alfredo',
    precio: 16.99,
    descripcion: 'Fettuccine pasta with creamy Alfredo sauce, topped with grilled chicken.',
    tipo: 'Platos fuertes',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '5',
    nombre: 'Ribeye Steak',
    precio: 24.99,
    descripcion: 'Juicy ribeye steak cooked to your liking, served with mashed potatoes and asparagus.',
    tipo: 'Platos fuertes',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '6',
    nombre: 'Chocolate Lava Cake',
    precio: 8.99,
    descripcion: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.',
    tipo: 'Postres',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '7',
    nombre: 'New York Cheesecake',
    precio: 7.99,
    descripcion: 'Classic cheesecake with a graham cracker crust, topped with strawberry sauce.',
    tipo: 'Postres',
    imagen: require('../../assets/images/calamari.jpg'),
  },
  {
    id: '8',
    nombre: 'Fruit Tart',
    precio: 9.99,
    descripcion: 'Sweet pastry crust filled with custard and topped with fresh fruits.',
    tipo: 'Postres',
    imagen: require('../../assets/images/calamari.jpg'),
  },
]

// Tipos de menú
const MENUS = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Platos fuertes', value: 'Platos fuertes' },
  { label: 'Postres', value: 'Postres' },
  { label: 'Entradas', value: 'Entradas' },
]

export default function Inicio() {
  const [menuActivo, setMenuActivo] = useState('Todos')
  const { agregarAlCarrito } = useCarrito()
  const router = useRouter()

  // Filtrar platos según el menú activo
  const platosFiltrados =
    menuActivo === 'Todos'
      ? PLATOS
      : PLATOS.filter((plato) => plato.tipo === menuActivo)

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <LiliumHeader />
      <View style={styles.container}>
        <Text style={styles.bienvenida}>Bienvenido, Mesero.</Text>
        <Image source={mesero.foto} style={styles.avatar} />
        <Text style={styles.nombre}>{mesero.nombre}</Text>
        <Text style={styles.rol}>{mesero.rol}</Text>
        {/* Menú de categorías */}
        <View style={styles.menuTabs}>
          {MENUS.map((menu) => (
            <TouchableOpacity
              key={menu.value}
              style={[
                styles.menuTab,
                menuActivo === menu.value && styles.menuTabActivo,
              ]}
              onPress={() => setMenuActivo(menu.value)}
            >
              <Text
                style={[
                  styles.menuTabText,
                  menuActivo === menu.value && styles.menuTabTextActivo,
                ]}
              >
                {menu.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Lista de platos */}
        <FlatList
          data={platosFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
          style={{ marginTop: 10, alignSelf: 'stretch' }}
          renderItem={({ item }) => (
            <View style={styles.platoCard}>
              <Image source={item.imagen} style={styles.platoImg} />
              <View style={{ flex: 1 }}>
                <Text style={styles.platoNombre}>{item.nombre}</Text>
                <Text style={styles.platoPrecio}>${item.precio}</Text>
                <Text style={styles.platoDesc}>{item.descripcion}</Text>
                <TouchableOpacity
                  style={styles.btnAgregar}
                  onPress={() => agregarAlCarrito(item)}
                >
                  <Text style={styles.btnAgregarText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.irCarrito}
          onPress={() => router.push('/(tabs)/carrito')}
        >
          <Text style={styles.irCarritoText}>Ir al carrito</Text>
        </TouchableOpacity>
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
  menuTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 8,
  },
  menuTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#e0d0e7',
  },
  menuTabActivo: {
    backgroundColor: '#d1a8f7',
  },
  menuTabText: {
    color: '#888',
    fontWeight: 'bold',
  },
  menuTabTextActivo: {
    color: '#7c2bc0',
  },
  platoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // <-- Esto hace que sean dos por fila
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 0, // El espacio lo da columnWrapperStyle
  },
  platoImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  platoNombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  platoPrecio: {
    color: '#7c2bc0',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  platoDesc: {
    color: '#888',
    fontSize: 12,
  },
  btnAgregar: {
    backgroundColor: '#d1a8f7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  btnAgregarText: {
    color: '#7c2bc0',
    fontWeight: 'bold',
  },
  irCarrito: {
    backgroundColor: '#b89cf7',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  irCarritoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})