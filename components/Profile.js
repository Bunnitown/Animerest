import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import '../Globals.js';
import {
  View,
  Text,
  Alert,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Profile = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [userpicture, setUserpicture] = useState('');
  const [confirmDownload, setConfirmDownload] = useState('true');

  const [userRequired, setUserRequired] = useState(false);
  const [pictureRequired, setPictureRequired] = useState(false);

  useEffect(() => {
    setUsername(global.username);
    setUserpicture(global.userpicture);
    setConfirmDownload(global.confirmDownload);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: global.body_backgroundColor }}>
      <View style={{ flex: 1, padding: global.screen_width / 16 }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: global.screen_width / 20,
            borderRadius: global.screen_width / 32,
            backgroundColor: global.body_containerColor,
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: global.body_subTextColor,
                  fontSize: global.screen_width / 30,
                }}>
                Username
              </Text>
              {userRequired && (
                <Text
                  style={{
                    color: global.body_requiredColor,
                    fontSize: global.screen_width / 30,
                    marginLeft: global.screen_width / 90,
                  }}>
                  Required
                </Text>
              )}
            </View>
            <TextInput
              maxLength={60}
              value={username}
              onChangeText={setUsername}
              style={{
                color: global.body_textColor,
                fontSize: global.screen_width / 30,
              }}
              ref={(input) => {
                usernameInput = input;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (username.trim().length == 0 || username == global.username) {
                setUserRequired(true);
                usernameInput.focus();
              } else {
                Keyboard.dismiss();
                setUserRequired(false);
                Alert.alert('Updating', 'Are you sure you want to update?', [
                  { text: 'Cancel' },
                  {
                    text: 'Update',
                    onPress: () => {
                      global.username = username;
                      SecureStore.setItemAsync('username', username);
                      navigation.dispatch(StackActions.replace(route.name));
                    },
                  },
                ]);
              }
            }}>
            <Icon
              name="badge"
              size={global.screen_width / 16}
              color={global.footer_selectedButtonColor}
              style={{
                flex: 0,
                marginLeft: global.screen_width / 26,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: global.screen_width / 20,
            marginTop: global.screen_width / 16,
            borderRadius: global.screen_width / 32,
            backgroundColor: global.body_containerColor,
          }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: global.body_subTextColor,
                  fontSize: global.screen_width / 30,
                }}>
                Picture URL
              </Text>
              {pictureRequired && (
                <Text
                  style={{
                    color: global.body_requiredColor,
                    fontSize: global.screen_width / 30,
                    marginLeft: global.screen_width / 90,
                  }}>
                  Required
                </Text>
              )}
            </View>
            <TextInput
              maxLength={60}
              value={userpicture}
              onChangeText={setUserpicture}
              style={{
                color: global.body_textColor,
                fontSize: global.screen_width / 30,
                backgroundColor: global.body_containerColor,
              }}
              ref={(input) => {
                userpictureInput = input;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (userpicture == global.userpicture) {
                setPictureRequired(true);
                userpictureInput.focus();
              } else {
                Keyboard.dismiss();
                setPictureRequired(false);
                Alert.alert('Updating', 'Are you sure you want to update?', [
                  { text: 'Cancel' },
                  {
                    text: 'Update',
                    onPress: () => {
                      global.userpicture = userpicture;
                      SecureStore.setItemAsync('userpicture', userpicture);
                      navigation.dispatch(StackActions.replace(route.name));
                    },
                  },
                ]);
              }
            }}>
            <Icon
              name="image-search"
              size={global.screen_width / 16}
              color={global.footer_selectedButtonColor}
              style={{
                flex: 0,
                marginLeft: global.screen_width / 26,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: global.screen_width / 20,
            marginTop: global.screen_width / 16,
            borderRadius: global.screen_width / 32,
            backgroundColor: global.body_containerColor,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (confirmDownload == 'true') {
                setConfirmDownload('false');
                global.confirmDownload = 'false';
                SecureStore.setItemAsync('confirmDownload', 'false');
              } else {
                setConfirmDownload('true');
                global.confirmDownload = 'true';
                SecureStore.setItemAsync('confirmDownload', 'true');
              }
            }}
            style={{
              flex: 0,
              justifyContent: 'center',
              width: global.screen_width / 12,
              height: global.screen_width / 12,
              marginRight: global.screen_width / 26,
              borderRadius: global.screen_width / 80,
              backgroundColor: global.body_backgroundColor,
            }}>
            {confirmDownload == 'false' && (
              <Icon
                name="done"
                size={global.screen_width / 16}
                color={global.footer_selectedButtonColor}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: 'center',
                color: global.body_subTextColor,
                fontSize: global.screen_width / 26,
              }}>
              Do not ask me to confirm download.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: global.screen_width / 7,
          borderTopLeftRadius: global.screen_width / 30,
          borderTopRightRadius: global.screen_width / 30,
          backgroundColor: global.footer_backgroundColor,
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace('Main'))}>
          <Icon
            name="home"
            size={global.screen_width / 12.6}
            color={global.footer_defaultButtonColor}
          />
        </TouchableOpacity>
        <Icon
          name="account-circle"
          size={global.screen_width / 12.6}
          color={global.footer_selectedButtonColor}
        />
      </View>
    </View>
  );
};

export default Profile;
