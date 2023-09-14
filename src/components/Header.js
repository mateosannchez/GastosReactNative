import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView>
            <View style={styles.contenedor}>
                <Text style={styles.texto}>Planificador de gastos</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    texto: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        top: 25,
    },
    contenedor: {
        backgroundColor: '#0e4991',
        width: 360,
        height: 140,
        justifyContent: 'center'
    }
})

export default Header