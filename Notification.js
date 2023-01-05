import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const defineSettings = async () => {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    if (Platform.OS == 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        lightColor: '#FF231F7C',
        vibrationPattern: [0, 250, 250, 250],
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus != 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus != 'granted') return;
      console.log(
        'TOKEN: ' + (await Notifications.getExpoPushTokenAsync()).data
      );
    }
  } catch (e) {
    console.error('ERRO: ' + e);
  }
};

const pushNotification = async (subtitle, title, body, url = '') => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        subtitle: subtitle,
        title: '☕' + title,
        body: body,
        sound: true,
        data: { url: url },
      },
      trigger: null,
    });
  } catch (exception) {
    console.error('ERRO: ' + exception);
  }

  cancelNotifications();
};

const cancelNotifications = async () => {
  try {
    defineSettings();
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(200);
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (exception) {
    console.error('ERRO: ' + exception);
  }
};

export { pushNotification };
