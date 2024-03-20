import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TextInput, TouchableHighlight, StyleSheet, Alert } from "react-native";
import { Box, Button, Heading, Icon, Image, Input, Pressable } from "native-base";
import {useDispatch} from "react-redux"
import axios from "axios";
import { setToken } from "../components/store/authSlice";
import { AppDispatch } from "../components/store/store";
import {API_URL} from '@env';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const Login = ({navigation}) =>{
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState<any>()
  const [show, setShow] = useState<boolean>(false)

  const handlerLogin = (email: string, password: string) => {
    if(!email || !password) return (Alert.alert(
      'Alert',
      'Email & Password Required',
    ))
    axios.post(API_URL+'/auth/local', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    },
      identifier: email,
      password: password
    })
    .then(function (response) {
      setData(response.data)
      Alert.alert(
        'Success',
        'Login Berhasil')
      dispatch(setToken(response.data.jwt))
      navigation.navigate("Home")
    })
    .catch(function (error) {
      console.log(JSON.stringify(error));
    });
    
  }

  return(
    <SafeAreaView>
      <ScrollView>
      <Image source={require("../assets/shape.png")} alt="" position={"absolute"}/>
      <View style={styles.sectionContainer}>
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/logoDummy.png")} size={"xl"} alignSelf={"center"} alt=""/>
          <Text style={{fontWeight: "bold", color: "#3492AB", fontFamily: "Poppins"}}>PERUMDA AIR MINUM</Text>
          <Heading style={{color: "#393A97"}}>TIRTA ARGAPURA</Heading>
          <Text style={{fontWeight: "600", color: "#393A97"}}>KAB. PROBOLINGGO</Text>
        </View>
        <View style={styles.formContainer}>
          <Box style={styles.input}>
          <Input borderColor={"white"} 
          onChangeText={(item) => setEmail(item)}
          value={email}
          w={{
            base: "100%",
            md: "25%"
          }} placeholder="Email" />
          </Box>
          <Box style={styles.input}>
          <Input borderColor={"white"} 
          onChangeText={(item) => setPassword(item)}
          value={password}
          w={{
            base: "100%",
            md: "25%"
          }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
          </Box>
        </View>
        <Text style={{alignSelf: "center", color: "#3492AB"}}>Forget Password ?</Text>
        <Button onTouchStart={() => handlerLogin(email, password)} style={styles.button}>
          Login
        </Button>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: "25%",
      paddingHorizontal: 24,
      gap: 20,
    },
    logoWrapper: {
      alignItems: "center",
      gap: 5,
      marginBottom: 30
    },
    heading: {
      fontSize: 25,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'black',
    },
    input: {
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: 'white',
      borderRadius: 30,
      padding: 10,
    },
    formContainer: {
      gap: 15,
    },
    button: {
      borderRadius: 8,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white',
      backgroundColor: '#3492AB',
      fontWeight: "bold"
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
