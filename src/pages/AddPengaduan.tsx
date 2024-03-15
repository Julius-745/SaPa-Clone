import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRef, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location';
import notifee,  { AndroidImportance } from '@notifee/react-native';
import Config from "react-native-config";
import { useSelector } from "react-redux";
import { RootState } from "../components/store/rootReducer";
import axios from "axios";
import { ScrollView } from "native-base";


function AddPengaduan(): React.JSX.Element  {
    const token = useSelector((state: RootState) => state.auth.token)
    const pickerRef = useRef();
    const [response, setResponse] = useState()
    const [selectedIssue, setSelectedIssue] = useState();
    const [deskripsi, setDeskripsi] = useState("");
    const [location, setLocation] = useState<any>()
    const [selectedImage, setSelectedImage] = useState(null);   

    const createPengaduan = async () => {
        try {
          const response = await axios.post("http://10.0.2.2:1337/api/pengaduans", {
            "data": {
            "tanggal_pengaduan": "2024-03-14",
            "kategori": selectedIssue,
            "deskripsi": deskripsi,
            "lokasi_pengaduan": (location.latitude+location.longitude).toString(),
            "users_permision_user": "pengguna"
            },
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          setResponse(response.data)
        } catch (error) {
          console.log("error", error)
        }
      }


    //create function to crawl each pengaduan updates


    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 6000,
        }).then(function (response) { 
            setLocation(response)
            Alert.alert(
                'Success',
                'Lokasi Berhasil Diambil')
            }
        ).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }


    return (
      <View style={styles.sectionContainer}>

        {/* datepicker */}
        <ScrollView>
        <View style={{gap: 20}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <Image source={{ uri: "https://dummyimage.com/100x100/fff7ff/000000&text=Dummy+Image"}} style={{ width: 200, height: 200 }}/>
        </TouchableOpacity>

        <Picker
            style={styles.input}
            ref={pickerRef}
            selectedValue={selectedIssue}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedIssue(itemValue)
            }>
            <Picker.Item label="Kebocoran" value="Kebocoran" />
            <Picker.Item label="Pemasanangan Massive" value="Pemasangan" />
            <Picker.Item label="Perawatan Massive" value="Perawatan" />
            <Picker.Item label="Lainnya" value="Lainnya" />
        </Picker>

        <TextInput
            multiline
            placeholder=
            {'Ex: Di Jalan Dekat Rumah saya \nterjadi bocor pipa pdam. \nJadinya air dirumah saya mati'}
            onChangeText={(item) => setDeskripsi(item)}
            value={deskripsi}
            style={styles.input}
          />
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={
        //     () => navigation.navigate("Tabs", {
        //     screen: "Profile", 
        //     params: {
        //       name: name,
        //       location: password
        //     }
        // })
        () => getCurrentLocation()
        }>Ambil Lokasi Terkini</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={
        () => createPengaduan()
        }>Upload Aduan</Text>
        </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      gap:10
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

export default AddPengaduan;