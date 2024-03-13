import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location'


function Home(): React.JSX.Element  {
    const pickerRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState();
    const [deskripsi, setDeskripsi] = useState("");
    const [location, setLocation] = useState<any>()


    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 6000,
        }).then(
            location => setLocation(location)
        ).catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }


    console.log("datas", selectedIssue, deskripsi, location)


    return (
      <View style={styles.sectionContainer}>

        {/* upload image
        kategori
        deskripsi
        lokasi */}

        <TouchableHighlight style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <View>
                <Text style={{flex:.8}}>Upload Image</Text>
                <Image src="https://dummyimage.com/100x100/fff7ff/000000&text=Dummy+Image"/>
            </View>
        </TouchableHighlight>

        <Picker
            style={styles.input}
            ref={pickerRef}
            selectedValue={selectedIssue}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedIssue(itemValue)
            }>
            <Picker.Item label="Kebocoran" value="kebocoran" />
            <Picker.Item label="Pemasanangan Massive" value="pemasangan" />
            <Picker.Item label="Perawatan Massive" value="perawatan" />
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

export default Home;