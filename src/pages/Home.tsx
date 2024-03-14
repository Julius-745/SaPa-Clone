import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location';
import notifee,  { AndroidImportance } from '@notifee/react-native';
import Config from "react-native-config";
import axios from "axios";
import { RootState } from "../components/store/rootReducer";
import { useSelector } from "react-redux";
import { Fab, Icon  } from "native-base";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from "@react-navigation/native";


function Home({navigation}): React.JSX.Element  {
    const token = useSelector((state: RootState) => state.auth.token)
    const [data, setData] = useState<any>()

    const getPengaduanData = async () => {
      try {
        const response = await axios("http://10.0.2.2:1337/api/pengaduans", {
        headers: {
          'Authorization': 'Bearer ' + token
        } 
        })
        setData(response.data.data)
      } catch (error) {
        console.log("error", error)
      }
    }

    useEffect(() => {
      getPengaduanData()
    }, [])


    return (
      <View style={styles.sectionContainer}>

        {/* upload image
        kategori
        deskripsi
        lokasi */}
        <FlatList 
        data={data}
        renderItem={({item}) => 

        <Text>
          {item.attributes.deskripsi}
        </Text>
        }
        />
        <Fab
          placement="bottom-right"
          colorScheme="blue"
          size="lg"
          icon={<Icons name="share" variant="FontAwesome" />}
          onTouchStart={() => navigation.navigate("AddPengguna")}
        />
        
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