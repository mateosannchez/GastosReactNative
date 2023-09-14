import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, ScrollView, Modal, StyleSheet, Text, View, Alert, Pressable, Image } from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import { useState, useEffect } from 'react';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormGasto from './src/components/FormGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';


export default function App() {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        } else {
          
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
    obtenerPresupuestoStorage()
  }, [])
  

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error);
          
        }
      }
      guardarPresupuestoStorage()
    }
    
  }, [isValidPresupuesto])

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')

        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error);
      }
    }

    obtenerGastosStorage()
  }, [])
  
  
  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error);
        
      }
    }
    guardarGastosStorage()
  }, [gastos])
  

  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser cero o menor')
    }

  }

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto. cantidad, gasto. categoria].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      )

      return
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      const random = Math.random().toString(36).substring(2, 11)
      const fecha = Date.now().toString(36)
      gasto.id = Date.now()
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id => {

    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style:'cancel'},
        {text: 'Si, ELiminar', onPress: () => {
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)

          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
          
        }},
      ]
    )
    
  }

  const resetearApp = () => {
    Alert.alert(
      'Deseas reiniciar la app',
      'Esto eliminara presupuesto y gasto',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])
          } catch (error) {
            console.log(error);
            
          }
        }},
      ]
    )
  }

  return (
    <ScrollView style={styles.color}>
      <View style={styles.container}>
        <View >
          <Header />

          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}

        </View>

        {isValidPresupuesto && (
          <>
          <Filtro
            filtro={filtro}
            setFiltro={setFiltro}
            gastos={gastos}
            setGastosFiltrados={setGastosFiltrados}
          />
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
          </>
        )}

        {modal && (
          <Modal
            animationType='slide'
            visible={modal}
          >
            <FormGasto
              setModal={setModal}
              handleGasto={handleGasto}
              setGasto={setGasto}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            />
          </Modal>
        )}

        {isValidPresupuesto && (
          <Pressable
          style={styles.pressable}
            onPress={() => setModal(!modal)}
          >
            <Image
              style={styles.imagen}
              source={require('./assets/img/nuevo-gasto.png')}
            />
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010912',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    flex: 1,
    backgroundColor: '#010912',
  },
  imagen: {
    width: 60,
    height: 60,
  },
  pressable: {
    width: 60,
    height: 60,
    left: 140,
  }
});
