// Importando bibliotecas.
import { View, Alert, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import { useEffect } from 'react';
import './Globals.js';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

// Importando componentes.
import Main from './components/Main';
import Profile from './components/Profile';
import Picture from './components/Picture';
import Pictures from './components/Pictures';
import { pushNotification } from './Notification';

// Definindo componente.
const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    const getConfirmDownload = async () => {
      const response = await SecureStore.getItemAsync('confirmDownload');
      if (!response || response.trim().length == 0)
        SecureStore.setItemAsync('confirmDownload', 'true');
      else if (response && response == 'false')
        global.confirmDownload = 'false';
      else if (response && response == 'true') global.confirmDownload = 'true';
    };

    const getUsername = async () => {
      const response = await SecureStore.getItemAsync('username');
      if (response && response.trim().length > 0) global.username = response;
      else SecureStore.setItemAsync('username', global.username);
    };

    const getPicture = async () => {
      const response = await SecureStore.getItemAsync('userpicture');
      if (response && response.trim().length > 0) global.userpicture = response;
      else SecureStore.setItemAsync('userpicture', global.userpicture);
    };

    getConfirmDownload();
    getUsername();
    getPicture();
  }, []);

  const downloadFile = (uri) => {
    const fileName =
      Math.floor(Math.random() * 8999999999) + 1000000000 + '.png';
    let fileUri = FileSystem.documentDirectory + fileName;
    let url = uri;

    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => saveFile(uri, fileName, url))
      .catch((e) => {
        console.error('ERRO: ' + e);
        pushNotification('Download', fileName, 'Unable to download.', url);
      });
  };

  const saveFile = async (fileUri, fileName, url) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status == 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('Animerest', asset, false);
      pushNotification('Download', fileName, 'Downloaded file.', url);
      const response = await SecureStore.getItemAsync('primarily');
      if (!response || response.trim().length == 0) {
        SecureStore.setItemAsync('primarily', 'false');
        Alert.alert('Asking again', 'Do ask again to confirm download?', [
          {
            text: 'No',
            onPress: () => {
              global.confirmDownload = 'false';
              SecureStore.setItemAsync('confirmDownload', 'false');
            },
          },
          { text: 'Yes' },
        ]);
      }
    } else
      pushNotification('Download', fileName, 'No permission to download.', url);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={({ navigation, route }) => ({
          title: global.header_title,
          headerTintColor: global.header_tintColor,
          headerStyle: {
            backgroundColor: global.header_backgroundColor,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeft: () =>
            route.name != 'Main' &&
            route.name != 'Profile' && (
              <TouchableOpacity
                style={{ marginLeft: global.screen_width / 42 }}
                onPress={() => navigation.pop()}>
                <Icon
                  name="keyboard-backspace"
                  size={global.screen_width / 20}
                  color={global.header_iconColor}
                />
              </TouchableOpacity>
            ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ marginRight: global.screen_width / 42 }}
                onPress={() => {
                  route.name == 'Pictures'
                    ? global.type.trim().length == 0 ||
                      global.category.trim().length == 0
                      ? navigation.pop()
                      : navigation.dispatch(
                          StackActions.replace('Pictures', {
                            type: global.type,
                            category: global.category,
                          })
                        )
                    : navigation.dispatch(StackActions.replace(route.name));
                }}>
                <Icon
                  name="cached"
                  size={global.screen_width / 20}
                  color={global.header_iconColor}
                />
              </TouchableOpacity>
              {route.name == 'Picture' ? (
                <TouchableOpacity
                  style={{ marginRight: global.screen_width / 42 }}
                  onPress={() => {
                    if (global.picture.trim().length == 0)
                      Alert.alert('Downloading', 'Unable to download.');
                    else if (global.confirmDownload == 'true')
                      Alert.alert(
                        'Downloading',
                        'Do you want to download it?',
                        [
                          { text: 'Cancel' },
                          {
                            text: 'Download',
                            onPress: () => downloadFile(global.picture),
                          },
                        ]
                      );
                    else downloadFile(global.picture);
                  }}>
                  <Icon
                    name="file-download"
                    size={global.screen_width / 20}
                    color={global.header_iconColor}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginRight: global.screen_width / 42 }}
                  onPress={() =>
                    Alert.alert(
                      'Copyright ©',
                      'Application created by Bunnitown\n\nIcon created by Freepik - Flaticon\n\nPictures generated by Waifu.pics'
                    )
                  }>
                  <Icon
                    name="verified-user"
                    size={global.screen_width / 20}
                    color={global.header_iconColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
        })}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Picture" component={Picture} />
        <Stack.Screen name="Pictures" component={Pictures} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Exportando componente.
export default App;
