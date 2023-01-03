import { TabView, SceneMap } from 'react-native-tab-view';
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
  Keyboard,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Main = ({ navigation }) => {
  const [waifu, setWaifu] = useState([]);
  const [neko, setNeko] = useState([]);
  const [shinobu, setShinobu] = useState([]);
  const [megumin, setMegumin] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [required, setRequired] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData().catch(console.error);
    setTimeout(() => setLoading(false), 1000);
  }, []); // eslint-disable-line

  const fetchData = async () => {
    setUsername(global.username);
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const getPictures = async (data, type, category) => {
      try {
        for (i = 0; i < 10; i++) {
          const response = await fetch(
            'https://api.waifu.pics/' + type + '/' + category
          );

          const json = await response.json();
          const url = json.url;

          data.push({
            picture: url,
            category: capitalize(category),
          });
        }
      } catch (e) {
        console.error('ERRO: ' + e);
      }
    };

    getPictures(waifu, 'sfw', 'waifu');
    getPictures(neko, 'sfw', 'neko');
    getPictures(shinobu, 'sfw', 'shinobu');
    getPictures(megumin, 'sfw', 'megumin');
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home' },
    { key: 'search' },
    { key: 'profile' },
  ]);

  const [now, setNow] = useState(new Date());
  const getCurrentDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const currentDate = month + ' ' + day + ', ' + year;
    return currentDate;
  };

  const createButton = (data, category) => (
    <TouchableOpacity
      onPress={() => {
        setSearch(category);
        setIndex(1);
      }}
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        padding: global.screen_width / 20,
        marginRight: global.screen_width / 16,
        borderRadius: global.screen_width / 32,
        backgroundColor: global.body_containerColor,
      }}>
      <View
        style={{
          width: global.screen_width / 10,
          height: global.screen_width / 10,
          marginRight: global.screen_width / 26,
          backgroundColor: global.body_imageColor,
          borderRadius:
            Math.round(global.screen_width + global.screen_height) / 2,
        }}>
        <Image
          style={{
            width: '100%',
            aspectRatio: 1,
            height: undefined,
            borderRadius:
              Math.round(global.screen_width + global.screen_height) / 2,
          }}
          source={{ uri: data[0].picture }}
        />
      </View>
      <View>
        <Text
          style={{
            color: global.body_subTextColor,
            fontSize: global.screen_width / 30,
          }}>
          Category
        </Text>
        <Text
          style={{
            color: global.body_textColor,
            fontSize: global.screen_width / 20,
          }}>
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: global.body_backgroundColor }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              margin: global.screen_width / 20,
              padding: global.screen_width / 16,
              borderRadius: global.screen_width / 32,
              backgroundColor: global.body_containerColor,
            }}>
            <ActivityIndicator
              size="large"
              color={global.footer_selectedButtonColor}
              style={{
                marginRight: global.screen_width / 20,
              }}
            />
            <View>
              <Text
                style={{
                  color: global.body_subTextColor,
                  fontSize: global.screen_width / 30,
                }}>
                Interface
              </Text>
              <Text
                style={{
                  color: global.body_textColor,
                  fontSize: global.screen_width / 20,
                }}>
                Loading...
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={{
              index,
              routes,
            }}
            renderScene={SceneMap({
              home: () => (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 2,
                      padding: global.screen_width / 16,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        color: global.body_textColor,
                        fontSize: global.screen_width / 16,
                      }}>
                      {Math.floor(Math.random() * 2)
                        ? 'Welcome, ' + global.username
                        : now.getHours() >= 6 && now.getHours() <= 12
                        ? 'Good morning'
                        : now.getHours() >= 13 && now.getHours() <= 17
                        ? 'Good afternoon'
                        : 'Good evening'}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: global.body_textColor,
                        fontSize: global.screen_width / 26,
                        marginTop: global.screen_width / 62,
                      }}>
                      {getCurrentDate()}
                    </Text>
                  </View>
                  <ScrollView
                    horizontal={true}
                    style={{
                      flex: 1,
                      zIndex: 10,
                      padding: global.screen_width / 16,
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          flex: 0,
                          color: global.body_textColor,
                          fontSize: global.screen_width / 20,
                        }}>
                        What pictures are you looking for?
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginTop: global.screen_width / 46,
                        }}>
                        {createButton(waifu, 'Waifu')}
                        {createButton(neko, 'Neko')}
                        {createButton(shinobu, 'Shinobu')}
                        {createButton(megumin, 'Megumin')}
                      </View>
                    </View>
                  </ScrollView>
                </View>
              ),
              search: () => (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 0,
                      padding: global.screen_width / 26,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: global.screen_width / 30,
                        borderRadius: global.screen_width / 32,
                        backgroundColor: global.body_containerColor,
                      }}>
                      <TextInput
                        maxLength={60}
                        value={search}
                        placeholder="Search"
                        placeholderTextColor={global.body_subTextColor}
                        style={{
                          flex: 1,
                          color: global.body_textColor,
                          fontSize: global.screen_width / 30,
                          backgroundColor: global.body_containerColor,
                        }}
                        onChangeText={(text) => {
                          setSearch(text);
                          setTimeout(() => searchInput.focus(), 0);
                        }}
                        ref={(input) => {
                          searchInput = input;
                        }}
                      />
                      <TouchableOpacity onPress={() => searchInput.focus()}>
                        <Icon
                          name="youtube-searched-for"
                          size={global.screen_width / 16}
                          color={global.footer_selectedButtonColor}
                          style={{
                            flex: 0,
                            marginLeft: global.screen_width / 40,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingLeft: global.screen_width / 26,
                      paddingRight: global.screen_width / 26,
                      paddingBottom: global.screen_width / 26,
                    }}>
                    <FlatList
                      data={[...waifu, ...neko, ...shinobu, ...megumin]}
                      contentContainerStyle={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}
                      renderItem={({ item, index }) =>
                        (search.trim().length == 0 ||
                          (search.trim().length > 0 &&
                            item.category
                              .toLowerCase()
                              .includes(search.toLowerCase()))) && (
                          <TouchableOpacity
                            onPress={() => {
                              global.picture = item.picture;
                              navigation.dispatch(StackActions.push('Picture'));
                            }}
                            style={[
                              {
                                margin: global.screen_width / 42,
                                width: global.screen_width / 2.46,
                                padding: global.screen_width / 30,
                                borderRadius: global.screen_width / 32,
                                backgroundColor: global.body_containerColor,
                              },
                              search.trim().length == 0 &&
                                index % 2 == 0 &&
                                index % 3 == 2 && {
                                  marginTop: -global.screen_width / 5.5,
                                },
                            ]}>
                            <Image
                              source={{
                                uri: item.picture,
                              }}
                              style={{
                                height:
                                  search.trim().length == 0 && index % 3 == 0
                                    ? global.screen_width / 3.5
                                    : global.screen_width / 2,
                                borderRadius: global.screen_width / 32,
                              }}
                            />
                            <Text
                              style={{
                                color: global.body_subTextColor,
                                fontSize: global.screen_width / 40,
                                paddingTop: global.screen_width / 30,
                              }}>
                              Category
                            </Text>
                            <Text
                              style={{
                                color: global.body_textColor,
                                fontSize: global.screen_width / 30,
                              }}>
                              {item.category}
                            </Text>
                          </TouchableOpacity>
                        )
                      }
                    />
                  </ScrollView>
                </View>
              ),
              profile: () => (
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
                        {required && (
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
                        style={{
                          color: global.body_textColor,
                          fontSize: global.screen_width / 30,
                          backgroundColor: global.body_containerColor,
                        }}
                        onChangeText={(text) => {
                          setUsername(text);
                          setTimeout(() => usernameInput.focus(), 0);
                        }}
                        ref={(input) => {
                          usernameInput = input;
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (username.trim().length == 0) {
                          setRequired(true);
                          usernameInput.focus();
                        } else {
                          Keyboard.dismiss();
                          setRequired(false);
                          Alert.alert(
                            'Updating',
                            'Are you sure you want to update?',
                            [
                              { text: 'Cancel' },
                              {
                                text: 'Update',
                                onPress: () => {
                                  global.username = username;
                                  SecureStore.setItemAsync(
                                    'username',
                                    username
                                  );
                                  navigation.dispatch(
                                    StackActions.replace('Main')
                                  );
                                },
                              },
                            ]
                          );
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
                </View>
              ),
            })}
            onIndexChange={setIndex}
            renderTabBar={() => null}
            style={{ flex: 1 }}
          />
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
            <TouchableOpacity onPress={() => index != 0 && setIndex(0)}>
              <Icon
                name="home"
                size={global.screen_width / 12.6}
                color={
                  index == 0
                    ? global.footer_selectedButtonColor
                    : global.footer_defaultButtonColor
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => index != 1 && setIndex(1)}>
              <Icon
                name="bubble-chart"
                size={global.screen_width / 12.6}
                color={
                  index == 1
                    ? global.footer_selectedButtonColor
                    : global.footer_defaultButtonColor
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => index != 2 && setIndex(2)}>
              <Icon
                name="account-circle"
                size={global.screen_width / 12.6}
                color={
                  index == 2
                    ? global.footer_selectedButtonColor
                    : global.footer_defaultButtonColor
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Main;
