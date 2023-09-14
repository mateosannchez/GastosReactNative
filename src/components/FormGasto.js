import { Picker } from '@react-native-picker/picker'
import React, { useState, useEffect } from 'react'
import { Text, TextInput, Pressable, StyleSheet, View } from 'react-native'

const FormGasto = ({ setModal, gasto, eliminarGasto, handleGasto, setGasto }) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }
    }, [gasto])
    

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorBtn}>
                <Pressable
                    style={[styles.btn,styles.btnCancelar]}
                    onLongPress={() => {
                        setModal(false)
                        setGasto({})
                    }}
                    onRequestClose={() => {
                        setModal(!modal)
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>

                {!!id && (

                <Pressable
                    style={[styles.btn, styles.btnEliminar]}
                   onLongPress={() => eliminarGasto(id)}
                >
                    <Text style={styles.btnCancelarTexto}>Eliminar</Text>
                </Pressable>
                )}
            </View>

            <View style={styles.formulario}>
                <Text style={styles.titulo}>{gasto?.nombre ? 'Editar gasto' : 'Nuevo gasto'}</Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre gasto</Text>
                    <TextInput
                        value={nombre}
                        onChangeText={setNombre}
                        style={styles.input}
                        placeholder='Nombre del gasto. Ej: Comida'
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad gasto</Text>
                    <TextInput
                        value={cantidad}
                        onChangeText={setCantidad}
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder='Cantidad del gasto. Ej: 300'
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Categoria gasto</Text>
                    <Picker 
                        selectedValue={categoria}
                        onValueChange={(value) => {
                            setCategoria(value)
                        } }
                        style={styles.input}
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

                <Pressable 
                style={styles.submitBtn}
                onPress={() => handleGasto({nombre, cantidad, categoria, id, fecha})}
                >
                    <Text style={styles.submitBtnText}>{gasto?.nombre ? 'Guardar cambios' : 'Agregar gasto'}</Text>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#010912',
        flex: 1,
    },
    formulario: {
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
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: 'white'
    },
    label: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        color: '#010912',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    campo: {
        marginVertical: 10
    },
    submitBtn: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#010912',
        fontWeight: 'bold',
        textTransform: 'uppercase',

    },
    btnCancelar: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    btn:{
        padding: 10,
        marginTop: 30,
        flex: 1,
    },
    btnEliminar:{
        backgroundColor: '#af170c',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    contenedorBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default FormGasto