import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'

const diccionarioIconos = {
    Ahorro: require('../../assets/img/icono_ahorro.png'),
    Comida: require('../../assets/img/icono_comida.png'),
    Casa: require('../../assets/img/icono_casa.png'),
    Gastos: require('../../assets/img/icono_gastos.png'),
    Ocio: require('../../assets/img/icono_ocio.png'),
    Salud: require('../../assets/img/icono_salud.png'),
    Subscripciones: require('../../assets/img/icono_suscripciones.png'),
}

const Gasto = ({ gasto, setModal, setGasto}) => {

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Actualiza la fecha actual cada segundo
        const interval = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000);
    
        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
      }, []);

      const formattedDate = currentDate.toLocaleDateString('es-ES');


    const { nombre, categoria, cantidad, fecha } = gasto
    
    const handleAcciones = () => {
        setModal(true)
        setGasto(gasto)
    }

    return (
        <Pressable
            onLongPress={handleAcciones}
        >
            <View style={styles.contenedor}>
                <View style={styles.contenido}>

                    <View style={styles.contenedorImg}>
                        <Image
                            style={styles.imagen}
                            source={diccionarioIconos[categoria]}
                        />

                        <View style={styles.contenedorTexto}>
                            <Text style={styles.categoria}>{categoria}</Text>
                            <Text style={styles.nombre}>{nombre}</Text>
                            <Text style={styles.fecha}>{formattedDate}</Text>
                        </View>
                    </View>

                    <Text style={styles.cantidad}>${cantidad}</Text>

                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#0e4991',
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        width: 340,
    },
    categoria: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    nombre: {
        color: 'white',
        fontSize: 22,
        marginBottom: 5,
    },
    cantidad: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5,
    },
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorTexto: {
        flex: 1,
    },
    contenedorImg: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    fecha: {
        color: 'white',
        fontWeight: '700'
    }
})

export default Gasto