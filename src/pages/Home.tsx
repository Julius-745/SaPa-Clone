import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet, FlatList, Linking} from "react-native";
import { useEffect, useRef, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import GetLocation from 'react-native-get-location';
import notifee,  { AndroidImportance } from '@notifee/react-native';
import Config from "react-native-config";
import axios from "axios";
import { RootState } from "../components/store/rootReducer";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Fab, HStack, Icon, Link, Stack, VStack   } from "native-base";
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import {API_URL} from '@env';
import { REPORT_STATUS } from "../components/icons/status";


function Home({navigation}): React.JSX.Element  {
    const isFocused = useIsFocused();
    const token = useSelector((state: RootState) => state.auth.token)
    const [data, setData] = useState<any>()

    const onDisplayNotification = async () => {
      // Request permissions (required for iOS)
      await notifee.requestPermission()
  
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: 'laporan Kejadian Terbaru',
        body: 'Main body content of the notification',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    }
    

    const getPengaduanData = async () => {
      try {
        const response = await axios.get(API_URL+"/pengaduans", {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': 'Bearer ' + token
        } 
        })
        if(data === undefined){
          setData(response.data.data)  
        }
        if(data?.length < response.data.data.length){
          const channelId = await notifee.createChannel({
            id: 'alarm',
            name: 'Firing alarms & timers',
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,
          });
      
          // Display a notification
          await notifee.displayNotification({
            title: 'Laporan Kejadian Terbaru',
            body: "Kebocoran terjadi baru di daerah anda",
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

    const getStatusId = (item: any, value: string) => {
      for(let i = 0; i < item.length; i++){
        if(value === item[i].name){
          return i
        }
      }
    }

    useEffect(() => {
      getPengaduanData()
    }, [isFocused == true])

    return (
      <><Image source={require("../assets/shape.png")} alt="" position={"absolute"} /><View style={styles.sectionContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                const location = item.attributes.lokasi_pengaduan.split(",");
                const label = "Indonesia, JKT, IDN"; //must be get from jalan kab probolinggo
                const url = `geo: ${location[0]}, ${location[1]}?q=${label}`;
                const statusId = getStatusId(REPORT_STATUS, item.attributes.status_pengaduan?.toLowerCase());

                return (
                  <Stack bg="white" rounded="md" shadow={3} key={index} marginBottom={2}>
                    <HStack justifyContent={"space-between"} margin={2}>
                      {/* <View>
                      {item.attributes.foto_pengaduan.data.map((item: any) => <Image source={{uri: API_URL+item.attributes.url}}></Image>)}
                    </View> */}
                      <View>
                        <Text>
                          {item.attributes.kategori}
                        </Text>
                        <Link href={url}>
                          Lihat Lokasi
                        </Link>
                      </View>
                      <View>
                        <Text>
                          <Icons name={REPORT_STATUS[statusId].iconName} />
                          {item.attributes.status_pengaduan}
                        </Text>
                      </View>
                    </HStack>
                    <Stack margin={2}>
                      <Text>
                        {item.attributes.deskripsi}
                      </Text>
                    </Stack>
                  </Stack>
                );
              } } />
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <Button onTouchStart={() => onDisplayNotification()}>Test Notif</Button>
        <Fab
          colorScheme="blue"
          size="lg"
          renderInPortal={false}
          icon={<Icons name="add" size={25} color={"white"} />}
          onTouchStart={() => navigation.navigate("AddPengaduan")}
          style={styles.fab} />

      </View></>
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