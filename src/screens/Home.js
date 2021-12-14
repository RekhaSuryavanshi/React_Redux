import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
//imported sqlite
import sqlite from 'react-native-sqlite-storage';
//import two values of react-redux module
import { useSelector, useDispatch } from 'react-redux';
//import two actions we created
import { setName, setAge, increaseAge, decreaseAge } from '../redux/actions';


//creating database
const db = sqlite.openDatabase({
    name: 'MainDB',
    location: 'default'
},
    () => { },
    error => { console.log(error); }
);

const Home = ({ navigation }) => {

    //React Redux provides a pair of custom React hooks 
    //that allow your React components to interact with the Redux store.

    //useSelector reads a value from the store state and subscribes to updates, 
    const { name, age } = useSelector(state => state.userReducer);
    //useDispatch returns the store's dispatch method to let you dispatch actions.
    const dispatch = useDispatch();
    // const [name, setName] = React.useState('');
    // const [age, setAge] = React.useState('');

    React.useEffect(() => {
        getData();
    }, []);

    // get the data from database which we have stored using set data
    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var userAge = results.rows.item(0).Age;
                            dispatch(setName(userName));
                            dispatch(setAge(userAge));
                        }
                    }
                )
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    // update the data
    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                await db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        () => { Alert.alert('Success!', 'Your data has been updated.') },
                        error => { console.log(error) }
                    )
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    //remove the data
    const removeData = async () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Users",
                    [],
                    () => { navigation.navigate('Login') },
                    error => { console.log(error) }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Welcome {name} !
            </Text>
            <Text style={styles.text}>
                Your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value) => dispatch(setName(value))}
            />
            <View style={styles.btn}>
                <Button
                    title='Update'
                    color='deepskyblue'
                    onPress={updateData}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='Remove'
                    color='sandybrown'
                    onPress={removeData}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='IncreaseAge'
                    color='orchid'
                    onPress={() => { dispatch(increaseAge()) }}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='DecreaseAge'
                    color='pink'
                    onPress={() => { dispatch(decreaseAge()) }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 60,
        marginTop: 60,
    },
    text: {
        fontSize: 25,
        color: 'black',
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30,
        marginBottom: 60,
    },
    btn: {
        marginBottom: 30,
    }
})
export default Home