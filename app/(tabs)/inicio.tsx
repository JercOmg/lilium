import { Text, View } from 'react-native'
import LiliumHeader from '../../components/LiliumHeader'

export default function Inicio() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <LiliumHeader />
      {/* Tu contenido aquí */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pantalla de Inicio</Text>
      </View>
    </View>
  )
}