import { Picker } from '@react-native-picker/picker'
import React, {useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'


const Filtro = ({setFiltro, filtro, gastos, setGastosFiltrados}) => {

    useEffect(() => {
        if (filtro === '') {
            setGastosFiltrados([])
        } else {
            const gastosFiltrados = gastos.filter(gastos => gastos.categoria === filtro)
        
            setGastosFiltrados(gastosFiltrados)
        }
    }, [filtro])
    

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Filtrar gastos</Text>

            <Picker
                style={styles.input}
                selectedValue={filtro}
                onValueChange={(valor) => {
                    setFiltro(valor)
                }}  
            >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Ahorro" value="Ahorro" />
                <Picker.Item label="Comida" value="Comida" />
                <Picker.Item label="Casa" value="Casa" />
                <Picker.Item label="Ocio" value="Ocio" />
                <Picker.Item label="Salud" value="Salud" />
                <Picker.Item label="Subscripciones" value="Subscripciones" />
                <Picker.Item label="Gastos varios" value="Gastos" />
            </Picker>
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
        width: 340,
        marginTop: 70,
    },
    label: {
        fontSize: 22,
        color: 'white',
        fontWeight: '900'
    },
    input: {
        color: '#010912',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
})

export default Filtro