import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import '../Globals.js';

const Picture = ({ navigation }) => {
  const [picture, setPicture] = useState(null);
  const [contain, setContain] = useState(false);

  const fetchData = async () => {
    if (global.picture.trim().length == 0) navigation.pop();
    setPicture(global.picture);
  };

  useEffect(() => fetchData(), []); // eslint-disable-line
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: global.screen_width / 26,
        backgroundColor: global.body_backgroundColor,
      }}>
      <Image
        resizeMode={contain ? 'contain' : 'cover'}
        source={{ uri: picture }}
        style={{
          height: '100%',
          borderRadius: global.screen_width / 32,
        }}
      />
      <TouchableOpacity
        onPress={() => setContain(!contain)}
        activeOpacity={0.92}
        style={{
          position: 'absolute',
          justifyContent: 'center',
          right: global.screen_width / 40,
          bottom: global.screen_width / 40,
          padding: global.screen_width / 30,
          backgroundColor: global.footer_backgroundColor,
          borderRadius:
            Math.round(global.screen_width + global.screen_height) / 2,
        }}>
        <Icon
          name={contain ? 'fullscreen-exit' : 'fullscreen'}
          size={global.screen_width / 16}
          color={global.footer_defaultButtonColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Picture;
