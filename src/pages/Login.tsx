import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TextInput, TouchableHighlight, StyleSheet, Alert } from "react-native";


const Login = ({navigation}) =>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlerLogin = (email: string, password: string) => {
    if(!email || !password) return (Alert.alert(
        'Alert',
        'Email & Password Required',
      ))

    if(email === "test@gmail.com" && password != ""){
        Alert.alert(
            'Success',
            'Login Success',
          )
        navigation.navigate("Home")
    } else if(email === "petugas@gmail.com" && password != ""){
        Alert.alert(
            'Success',
            'Login Success',
          )
        navigation.navigate("Home")
    } else {
        return (Alert.alert(
            'Alert',
            'Account Not Found',
          ))
    }
    
  }

  return(
    <SafeAreaView>
      <ScrollView style={styles.sectionContainer}>
      <View style={styles.formContainer}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Nama"
            onChangeText={(item) => setEmail(item)}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(item) => setPassword(item)}
            value={password}
          />
        </View>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={
        //     () => navigation.navigate("Tabs", {
        //     screen: "Profile", 
        //     params: {
        //       name: name,
        //       location: password
        //     }
        // })
        () => handlerLogin(email, password)
        }>Login</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    heading: {
      fontSize: 25,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'black',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
      padding: 10,
    },
    formContainer: {
      gap: 15,
    },
    button: {
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      backgroundColor: '#378fe9',
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });


export default Login;
