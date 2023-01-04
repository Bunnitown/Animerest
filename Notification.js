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

const pushNotification = async (title, body) => {
  try {
    cancelNotifications();
    var trigger = new Date();
    trigger.setSeconds(trigger.getSeconds() + 1);
    await Notifications.scheduleNotificationAsync({
      trigger,
      content: {
        sound: 'chime.aiff',
        title: title,
        body: body,
      },
    });
  } catch (exception) {
    console.error('Não foi possível enviar a notificação: ' + exception);
  }
};

const cancelNotifications = async () => {
  try {
    defineSettings();
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (exception) {
    console.error('ERRO: ' + exception);
  }
};

export { pushNotification };
