import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet, FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location';
import notifee,  { AndroidImportance } from '@notifee/react-native';
import Config from "react-native-config";
import axios from "axios";
import { RootState } from "../components/store/rootReducer";
import { useSelector } from "react-redux";
import { Button, Fab, Icon  } from "native-base";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import {API_URL} from '@env';


function Home({navigation}): React.JSX.Element  {
    const isFocused = useIsFocused();
    const token = useSelector((state: RootState) => state.auth.token)
    const [data, setData] = useState<any>()
    

    const getPengaduanData = async () => {
      try {
        const response = await axios.get(API_URL+"pengaduans", {
        headers: {
          'Authorization': 'Bearer ' + token
        } 
        })
        if(data === undefined){
          setData(response.data.data)
        }
        else if(data.length < response.data.data.length){
          const channelId = await notifee.createChannel({
            id: 'alarm',
            name: 'Firing alarms & timers',
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,
          });
      
          // Display a notification
          await notifee.displayNotification({
            title: 'Notification Test',
            body: 'Main body content of the notification',
            android: {
              channelId,
              pressAction: {
                id: 'default',
              },
            },
          }).then(() => setData(response.data.data))
        }
      } catch (error) {
        console.log("error", error)
      }
    }

    useEffect(() => {
      getPengaduanData()
    }, [isFocused == true])


    return (
      <View style={styles.sectionContainer}>
        <FlatList 
        data={data}
        renderItem={({item}) => 

        <Text>
          {item.attributes.deskripsi}
        </Text>
        }
        />
        {/* <Button onTouchStart={() => onDisplayNotification()}>Test Notif</Button> */}
        <Fab
          colorScheme="blue"
          size="lg"
          renderInPortal={false}
          icon={<Icons name="add" size={25} color={"white"}/>}
          onTouchStart={() => navigation.navigate("AddPengaduan")}
          style={styles.fab}
        />
        
      </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      gap:10,
      height: "100%"
    },
    heading: {
      fontSize: 25,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'black',
    },
    fab: {
      bottom: 50,
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