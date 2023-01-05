import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import '../Globals.js';

const Main = ({ route, navigation }) => {
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

  const [connected, setConnected] = useState(200);
  const checkConnection = async () => {
    fetch('https://api.waifu.pics/sfw/waifu')
      .then(
        (response) => response.status == 404 && setConnected(response.status)
      )
      .catch((e) => {
        console.error('ERRO: ' + e);
        setConnected(500);
      });
  };

  const [waifu, setWaifu] = useState(null);
  const [neko, setNeko] = useState(null);
  const [shinobu, setShinobu] = useState(null);
  const [megumin, setMegumin] = useState(null);

  const fetchData = () => {
    const getPicture = async (setData, type, category) => {
      fetch('https://api.waifu.pics/'.concat(type, '/').concat(category))
        .then((resp) => resp.json())
        .then((json) => {
          data = json.url;
          setData({ uri: data });
        })
        .catch((e) => console.error('ERRO: ' + e));
    };

    getPicture(setWaifu, 'sfw', 'waifu');
    getPicture(setNeko, 'sfw', 'neko');
    getPicture(setShinobu, 'sfw', 'shinobu');
    getPicture(setMegumin, 'sfw', 'megumin');
  };

  useEffect(() => {
    checkConnection();
    checkPicture();
    fetchData();
  }, []);

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const createButton = (type, category, small = false) =>
    !small ? (
      <TouchableOpacity
        onPress={() =>
          connected == 200
            ? navigation.dispatch(
                StackActions.push('Pictures', { type, category })
              )
            : null
        }
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginRight:
            category == 'Megumin'
              ? global.screen_width / 8
              : global.screen_width / 16,
          padding: global.screen_width / 20,
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
            source={
              connected == 200
                ? category == 'Waifu'
                  ? waifu
                  : category == 'Neko'
                  ? neko
                  : category == 'Shinobu'
                  ? shinobu
                  : category == 'Megumin'
                  ? megumin
                  : null
                : require('../assets/Disconnected.png')
            }
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
    ) : (
      <TouchableOpacity
        onPress={() =>
          connected == 200
            ? navigation.dispatch(
                StackActions.push('Pictures', {
                  type: type.toLowerCase(),
                  category: capitalize(category.toLowerCase()),
                })
              )
            : null
        }
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: global.screen_width / 60,
          padding: global.screen_width / 30,
          borderRadius: global.screen_width / 32,
          backgroundColor: global.body_containerColor,
        }}>
        <Icon
          name="nights-stay"
          size={global.screen_width / 25}
          color={global.footer_selectedButtonColor}
          style={{ marginRight: global.screen_width / 60 }}
        />
        <Text
          numberOfLines={1}
          style={{
            color: global.body_subTextColor,
            fontSize: global.screen_width / 30,
            marginRight: global.screen_width / 60,
          }}>
          {type}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: global.body_textColor,
            fontSize: global.screen_width / 30,
          }}>
          {category}
        </Text>
      </TouchableOpacity>
    );

  const [profilePicture, setProfilePicture] = useState(null);
  const checkPicture = () => {
    if (global.userpicture.trim().length == 0)
      setProfilePicture(require('../assets/Profile.png'));
    else {
      fetch(global.userpicture)
        .then((response) => {
          if (response.status == 404)
            setProfilePicture(require('../assets/Disconnected.png'));
          else setProfilePicture({ uri: global.userpicture });
        })
        .catch(() => setProfilePicture(require('../assets/Profile.png')));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: global.body_backgroundColor }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingTop: global.screen_width / 16,
            paddingLeft: global.screen_width / 16,
            paddingRight: global.screen_width / 16,
          }}>
          <View style={{ flex: 0 }}>
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
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(StackActions.replace(route.name))
              }
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                padding: global.screen_width / 20,
                marginTop: global.screen_width / 18,
                borderRadius: global.screen_width / 32,
                backgroundColor: global.body_containerColor,
              }}>
              <View
                style={{
                  flex: 0,
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
                      Math.round(global.screen_width + global.screen_height) /
                      2,
                  }}
                  source={
                    connected == 200
                      ? profilePicture
                      : require('../assets/Profile.png')
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: global.body_textColor,
                    fontSize: global.screen_width / 30,
                  }}>
                  {global.username}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: global.body_subTextColor,
                    fontSize: global.screen_width / 30,
                  }}>
                  {connected == 200
                    ? 'Connection established.'
                    : 'Connection not established.'}
                </Text>
              </View>
              <Text
                style={{
                  flex: 0,
                  fontSize: global.screen_width / 20,
                  marginLeft: global.screen_width / 30,
                  color: global.footer_selectedButtonColor,
                }}>
                {(now.getHours() < 9 ? '0' + now.getHours() : now.getHours()) +
                  ':' +
                  (now.getMinutes() < 9
                    ? '0' + now.getMinutes()
                    : now.getMinutes())}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            {(now.getHours() <= 12 || now.getHours() >= 18) && (
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {createButton('NSFW', 'NEKO', true)}
                {createButton('NSFW', 'TRAP', true)}
                {createButton('NSFW', 'WAIFU', true)}
                {createButton('NSFW', 'BLOWJOB', true)}
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 0 }}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              paddingLeft: global.screen_width / 16,
            }}>
            <View>
              <Text
                style={{
                  color: global.body_textColor,
                  fontSize: global.screen_width / 20,
                  marginBottom: global.screen_width / 16,
                }}>
                What pictures are you looking for?
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginRight: -global.screen_width / 15,
                  marginBottom: global.screen_width / 16,
                }}>
                {createButton('sfw', 'Waifu')}
                {createButton('sfw', 'Neko')}
                {createButton('sfw', 'Shinobu')}
                {createButton('sfw', 'Megumin')}
              </View>
            </View>
          </ScrollView>
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
        <Icon
          name="home"
          size={global.screen_width / 12.6}
          color={global.footer_selectedButtonColor}
        />
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace('Profile'))}>
          <Icon
            name="account-circle"
            size={global.screen_width / 12.6}
            color={global.footer_defaultButtonColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
