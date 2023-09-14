import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Gasto from './Gasto'


const ListadoGastos = ({ gastos, setModal, setGasto, filtro, gastosFiltrados }) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>

            {filtro ? gastosFiltrados.map(gasto => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setModal={setModal}
                    setGasto={setGasto}
                />
            )) : gastos.map(gasto => (
                <Gasto
                    key={gasto.id}
                    gasto={gasto}
                    setModal={setModal}
                    setGasto={setGasto}
                />
            ))}

            { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
                <Text style={styles.noGastos}>No hay gastos</Text>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 10,
    },
    titulo: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20,
    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    }
})

export default ListadoGastos