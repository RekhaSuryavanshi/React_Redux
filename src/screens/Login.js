import React from 'react'
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
//imported sqlite
import sqlite from 'react-native-sqlite-storage';
//import two values of react-redux module
import { useSelector, useDispatch } from 'react-redux';
//import two actions we created
import { setName, setAge } from '../redux/actions';

// 1. creating database
const db = sqlite.openDatabase({
    name: 'MainDB',
    location: 'default'
},
    () => { },
    error => { console.log(error); }
);

const Login = ({ navigation }) => {

    const { name, age } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    //const [name, setName] = React.useState('');
    //const [age, setAge] = React.useState('');

    React.useEffect(() => {
        createDatabase();
        getData();
    }, []);

    //creating table in database with Id, Name and Age columns
    const createDatabase = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    }
    //if the information is already saved then user directly navigate to Home page
    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            navigation.navigate('Home');
                        }
                    }
                )
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    // 2. using Insert query adding data to the table and saving the data
    const setData = async () => {
        if (name.length == 0 || age.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                //store input values in states
                dispatch(setName(name));
                dispatch(setAge(age));
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age]
                    );
                })
                navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <View style={styles.body}>
            <Image
                style={{ width: 100, height: 100, marginBottom: 15 }}
                source={require("../assets/react-redux.png")}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => dispatch(setName(value))}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => dispatch(setAge(value))}
            />
            <Button
                title='Login'
                color='purple'
                onPress={setData}>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: 'transparent'
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30,
        marginTop: 30
    },
    text: {
        fontSize: 25,
        color: 'black',
        marginBottom: 50
    },
    imageStyle: {
        marginTop: 100,
        flexDirection: 'column',
        alignItems: 'center',
        height: 70,
        width: 70,
        alignSelf: 'center'
    },

})
export default Login;
