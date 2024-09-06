

export const sendPushNotification = async (expoPushToken) => {
  console.log(">>>>>>>>>>>>>>>>>>",expoPushToken)
  const message = {
    to: expoPushToken, // Ensure this token is correct
    sound: 'default',
    title: 'Hello!',
    body: 'This is a notification sent from your app.',
    data: { data: 'some data' },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log('Push notification response:', data);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }


  // const message = {
  //   to: expoPushToken,
  //   sound: 'default',
  //   title: 'Test title',
  //   body: 'Test body',
  //   data: { testData: 'test data' },
  // };
 
  // await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message),
  // });
};