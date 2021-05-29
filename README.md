# Minidoro Clock

Minimalistic timer tool inspired by the Pomodoro Technique invented by Francesco Cirillo. This tool's main aim is to help us organize our study schedule and divide sessions into short intervals called pomodoros (tomatoes), traditionally 25 minutes long.

## Technology Stack

- React: web version's core
- React Native: mobile version
- react-helmet: for displaying the time dynamically in the tab part
- moment: converting dates

### React

Both web version and mobile version was build with React. The project is based on stateful components, however in order to
loop the "White Noise" sound, createRef "hook" has been used. Clock works thanks to intervals which are constantly changing
the state. All of the sessions are stored in the local store of user's browser. On every run, ComponentDidMount is called to check
the local storage for pervious session. Thanks to moment library, the dates are easily compared so sessions array can be erased.

### Mobile version

Mobile version has been rewritten using React Native framework and Expo tool. Since there are slight differences
between React and React Native, there are few slight differences.

Mobile version's code can be found here: [https://github.com/KowalewskiPawel/Minidoro-Clock-React-Native](https://github.com/KowalewskiPawel/Minidoro-Clock-React-Native)


### Google Play Store

Mobile version built with React Native has been deployed to Google Store and can be downloaded from here: [https://play.google.com/store/apps/details?id=com.practicalearning.minidoroclock](https://play.google.com/store/apps/details?id=com.practicalearning.minidoroclock)


## Known issues

- createRef hook has been used inside of the Clock component for the purpose of looping the White Noise sound
- lag in between the loops of White Noise sound

### TODO

- Update UI
- adding new sounds

### Live version

[https://minidoroclock.netlify.app/](https://minidoroclock.netlify.app/)
