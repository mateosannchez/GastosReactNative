import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'


const NuevoPresupuesto = ({ handleNuevoPresupuesto, presupuesto, setPresupuesto }) => {

    useEffect(() => {
        const obtenerAS = async () => {

            try {
                const valor = await AsyncStorage.getItem('prueba_as')
                console.log(valor);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerAS()
    }, [])

    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir presupuesto</Text>

            <TextInput
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto: Ej. 300'
                style={styles.input}
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />

            <Pressable
                style={styles.btn}
                onPress={() => handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={styles.btnTexto}>Agregar presupuesto</Text>
            </Pressable>
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
    btn: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    btnTexto: {
        color: '#010912',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    label: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        padding: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 30,
    },
})

export default NuevoPresupuesto