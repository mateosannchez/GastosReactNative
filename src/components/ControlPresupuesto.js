import { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';


const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
            )

            setTimeout(() => {
                setPorcentaje(nuevoPorcentaje)
            }, 1000);
            

        setDisponible(totalDisponible)
        setGastado(totalGastado);
    }, [gastos])


    return (
        <View style={styles.contenedor}>
            <View style={styles.centrarGrafica}>

                <CircularProgress size={220} width={7} fill={porcentaje} tintColor="#00e0ff" backgroundColor="#3d5875">
                    {(fill) => (
                        <View>

                            <Text style={styles.textCircular}>{`${Math.round(fill)}%`}</Text>
                            <Text style={styles.text1Circular}>Gastado</Text>
                        </View>
                    )}
                </CircularProgress>
            </View>

            <View style={styles.contenedorText}>

                <Pressable
                    style={styles.btn}
                    onLongPress={resetearApp}
                    >
                    <Text style={styles.btnTexto}>Reiniciar app</Text>
                </Pressable>

                <Text style={styles.valor}>
                    <Text style={styles.label}>
                        Presupuesto: {''}
                    </Text>
                    ${presupuesto}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>
                        Disponible: {''}
                    </Text>
                    ${disponible}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>
                        Gastado: {''}
                    </Text>
                    ${gastado}
                </Text>
            </View>
        </View>
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
    },
    centrarGrafica: {
        alignItems: 'center'
    },
    contenedorText: {
        marginTop: 50,
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    label: {
        fontWeight: '700',
        color: 'white'
    },
    textCircular: {
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
        textAlign: 'center',
    },
    text1Circular: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#3d5875',
        padding: 10,
        marginBottom: 40,
        borderRadius: 10,
    },
    btnTexto: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
})

export default ControlPresupuesto