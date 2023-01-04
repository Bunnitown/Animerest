import { StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import '../Globals.js';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Clipboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Pictures = ({ route, navigation }) => {
  const [category, setCategory] = useState(route.params.category);
  const [type, setType] = useState(route.params.type);
  const [pictures, setPictures] = useState([]);

  const fetchData = async () => {
    global.category = category;
    global.type = type;

    const url = ''
      .concat('https://api.waifu.pics/', 'many/')
      .concat(type, '/')
      .concat(category.toLowerCase());
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    };
    fetch(url, requestOptions)
      .then((resp) => resp.json())
      .then((json) => {
        data = json.files;
        setPictures(data);
      })
      .catch((e) => console.error('ERRO: ' + e));
  };

  useEffect(() => fetchData(), []); // eslint-disable-line
  return (
    <View style={{ flex: 1, backgroundColor: global.body_backgroundColor }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: global.screen_width / 26,
        }}>
        <FlatList
          data={pictures}
          contentContainerStyle={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          renderItem={({ item, index }) =>
            !(category == 'Blowjob' && index >= 10) && (
              <TouchableOpacity
                onPress={() => {
                  global.picture = item;
                  navigation.dispatch(StackActions.push('Picture'));
                }}
                style={[
                  {
                    marginBottom: global.screen_width / 22,
                    width: global.screen_width / 2.27,
                    padding: global.screen_width / 30,
                    borderRadius: global.screen_width / 32,
                    backgroundColor: global.body_containerColor,
                  },
                  index % 2 == 0 &&
                    index % 3 == 2 && {
                      marginTop: -global.screen_width / 4.7,
                    },
                ]}>
                <Image
                  source={{
                    uri: item,
                  }}
                  style={{
                    height:
                      index % 3 == 0
                        ? global.screen_width / 3.5
                        : global.screen_width / 2,
                    borderRadius: global.screen_width / 32,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: global.screen_width / 30,
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: global.body_subTextColor,
                        fontSize: global.screen_width / 40,
                      }}>
                      Category
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: global.body_textColor,
                        fontSize: global.screen_width / 30,
                      }}>
                      {category}
                    </Text>
                  </View>
                  <View style={{ flex: 0, flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          Clipboard.setString(item);
                        } catch (e) {
                          console.error('ERRO: ' + e);
                        }
                      }}
                      style={{
                        padding: global.screen_width / 70,
                        marginRight: global.screen_width / 62,
                        borderRadius: global.screen_width / 42,
                        backgroundColor: global.body_backgroundColor,
                      }}>
                      <Icon
                        name="content-copy"
                        size={global.screen_width / 20}
                        color={global.footer_selectedButtonColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          'Saving',
                          'Save this as your profile picture?',
                          [
                            { text: 'Cancel' },
                            {
                              text: 'Save',
                              onPress: () => {
                                global.userpicture = item;
                                SecureStore.setItemAsync('userpicture', item);
                                navigation.pop();
                                navigation.dispatch(
                                  StackActions.replace('Main')
                                );
                              },
                            },
                          ]
                        )
                      }
                      style={{
                        padding: global.screen_width / 70,
                        borderRadius: global.screen_width / 42,
                        backgroundColor: global.body_backgroundColor,
                      }}>
                      <Icon
                        name="save"
                        size={global.screen_width / 20}
                        color={global.footer_selectedButtonColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        />
      </ScrollView>
    </View>
  );
};

export default Pictures;
