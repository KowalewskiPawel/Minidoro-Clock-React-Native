import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function App() {
  return (
    <View style={styles.container}>
      <Title />
      <Clock />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(34, 32, 32)",
    width: "100%",
    paddingTop: 4,
    paddingBottom: 8,
    alignItems: "center",
    textAlign: "center",
  },
  body: { flex: 8, backgroundColor: "rgb(110, 115, 119)", width: "100%" },
  footer: {
    flex: 1,
    backgroundColor: "rgb(34, 32, 32)",
    width: "100%",
    paddingTop: 10,
  },
  timer: {
    marginTop: 40,
    marginBottom: 30,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "rgb(10, 7, 7)",
    borderRadius: 40,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
  },
  change: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  achievements: {
    width: "90%",
    height: "auto",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgb(10, 7, 7)",
    borderRadius: 20,
    backgroundColor: "rgb(65, 64, 62)",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  pomos: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 4,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "rgb(10, 7, 7)",
    borderRadius: 20,
    backgroundColor: "rgb(65, 64, 62)",
  },
  buttonRed: {
    width: "20%",
    marginLeft: "auto",
    marginRight: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(173, 26, 26)",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "rgb(10, 7, 7)",
    borderRadius: 20,
  },
  buttonGray: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(53, 53, 53)",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgb(10, 7, 7)",
    borderRadius: 20,
  },
  settings: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
});

class Clock extends React.Component {
  constructor(props) {
    super(props);
    const dateCreate = moment().format("MMM Do YY");
    this.state = {
      isToggleOn: true,
      time: 60 * 25,
      break: 60 * 10,
      isBreak: false,
      timeLength: 25,
      breakLength: 10,
      whiteNoise: false,
      sessions: [],
      playingStatus: "nosound",
      modalVisible: false,
      date: dateCreate,
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
    this.startTimer();
  };

  handleReset = () => {
    this.resetTimer();
    this.resetBreak();
  };

  handleIncrementTime = () => {
    if (this.state.time < 30 * 60) {
      this.setState((prevState) => ({
        time: prevState.time + 60,
        timeLength: prevState.timeLength + 1,
      }));
    }
  };

  handleDecrementTime = () => {
    if (this.state.time > 1 * 60) {
      this.setState((prevState) => ({
        time: prevState.time - 60,
        timeLength: prevState.timeLength - 1,
      }));
    }
  };

  handleIncrementBreak = () => {
    if (this.state.break < 30 * 60) {
      this.setState((prevState) => ({
        break: prevState.break + 60,
        breakLength: prevState.breakLength + 1,
      }));
    }
  };

  handleDecrementBreak = () => {
    if (this.state.break > 60) {
      this.setState((prevState) => ({
        break: prevState.break - 60,
        breakLength: prevState.breakLength - 1,
      }));
    }
  };

  startTimer = () => {
    const timeLast = this.state.timeLength;
    const breakLast = this.state.breakLength;
    if (this.state.time > 0 && !this.state.isBreak) {
      if (this.state.isToggleOn) {
        this.counter = setInterval(() => {
          this.setState((prevState) => ({
            time: prevState.time - 1,
          }));
          if (this.state.time === 0) {
            this.playRing();
            this.setState((state) => ({
              isToggleOn: !state.isToggleOn,
              isBreak: !state.isBreak,
            }));
            clearInterval(this.counter);
            this.setState({
              time: timeLast * 60,
            });
            this.setState(
              (prevState) => ({
                sessions: [...prevState.sessions, "🍅"],
              }),
              async () => {
                try {
                  await AsyncStorage.setItem(
                    "sessions",
                    JSON.stringify(this.state.sessions)
                  );
                } catch (e) {
                  console.log(e);
                }
              }
            );
          }
          this.saveLocal();
        }, 1000);
      } else {
        clearInterval(this.counter);
      }
    }
    if (this.state.isBreak) {
      if (this.state.isToggleOn) {
        this.counter2 = setInterval(() => {
          this.setState((prevState) => ({
            break: prevState.break - 1,
          }));
          if (this.state.break === 0) {
            this.playRing();
            this.setState((state) => ({
              isToggleOn: !state.isToggleOn,
              isBreak: !state.isBreak,
            }));
            clearInterval(this.counter2);
            this.setState({
              break: breakLast * 60,
            });
          }
        }, 1000);
      } else {
        clearInterval(this.counter2);
      }
    }
  };

  playRing = () => {
    (async () => {
      const play_yes = await Audio.Sound.createAsync(
        require("./assets/ring.mp3"),
        { shouldPlay: true }
      );
    })();
  };

  resetTimer = () => {
    this.setState({
      time: 60 * 25,
      timeLength: 25,
    });
  };

  resetBreak = () => {
    this.setState({
      break: 60 * 10,
      breakLength: 10,
    });
  };

  async _playRecording() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/noise.mp3"),
      {
        shouldPlay: true,
        isLooping: true,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      playingStatus: "playing",
    });
  }

  _updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.playingStatus !== "playing") {
      this.setState({ playingStatus: "playing" });
    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
      this.setState({ playingStatus: "donepause" });
    }
  };

  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "playing") {
        await this.sound.pauseAsync();
        this.setState({
          playingStatus: "donepause",
        });
      } else {
        await this.sound.playAsync();
        this.setState({
          playingStatus: "playing",
        });
      }
    }
  }

  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "playing") {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }

  _playAndPause = () => {
    if (!this.state.whiteNoise) {
      this.setState({
        whiteNoise: true,
      });
    }
    if (this.state.whiteNoise) {
      this.setState({
        whiteNoise: false,
      });
    }
    switch (this.state.playingStatus) {
      case "nosound":
        this._playRecording();
        break;
      case "donepause":
      case "playing":
        this._pauseAndPlayRecording();
        break;
    }
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  saveLocal = () => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(this.state.date);
        await AsyncStorage.setItem("pomoDay", jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  };

  componentDidMount() {
    const getSessions = async () => {
      try {
        const sessions = await AsyncStorage.getItem("sessions");
        return sessions != null ? JSON.parse(sessions) : null;
      } catch (e) {
        console.error(e);
      }
    };

    const getDate = async () => {
      try {
        const pomoDay = await AsyncStorage.getItem("pomoDay");
        return pomoDay != null ? JSON.parse(pomoDay) : null;
      } catch (e) {
        console.error(e);
      }
    };
    const session = getSessions();
    const date = getDate();
    if (session) {
      if (date === this.state.date) {
        this.setState({ sessions: session });
      }
    }
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.body}>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 0,
          }}
        >
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            {!this.state.isBreak ? "It's study time" : "It's break time"}
          </Text>
        </View>
        <View style={styles.timer}>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 40,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            {!this.state.isBreak
              ? Math.floor(this.state.time / 60)
              : Math.floor(this.state.break / 60)}
          </Text>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 40,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            :
          </Text>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 40,
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            {!this.state.isBreak
              ? String(Math.floor(this.state.time % 60)).padStart(2, "0")
              : String(Math.floor(this.state.break % 60)).padStart(2, "0")}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonRed} onPress={this.handleClick}>
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                fontFamily: "Roboto",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {this.state.isToggleOn ? "START" : "STOP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "20%",
              marginLeft: "auto",
              marginRight: 20,
              padding: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(53, 53, 53)",
              borderStyle: "solid",
              borderWidth: 3,
              borderColor: "rgb(10, 7, 7)",
              borderRadius: 20,
            }}
            onPress={() => {
              this.setState({
                isBreak: !this.state.isBreak,
                isToggleOn: true,
                time: this.state.timeLength * 60,
                break: this.state.breakLength * 60,
              });
              clearInterval(this.counter);
              clearInterval(this.counter2);
            }}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                fontFamily: "Roboto",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {!this.state.isBreak ? "Break Time" : "Study Time"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={this.handleReset}>
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                fontFamily: "Roboto",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              RESET
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.change}>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            TIME:
          </Text>
          <TouchableOpacity
            style={styles.buttonGray}
            onPressIn={this.handleIncrementTime}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {this.state.timeLength}
          </Text>
          <TouchableOpacity
            style={styles.buttonGray}
            onPressIn={this.handleDecrementTime}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            BREAK:
          </Text>
          <TouchableOpacity
            style={styles.buttonGray}
            onPressIn={this.handleIncrementBreak}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              +
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {this.state.breakLength}
          </Text>
          <TouchableOpacity
            style={styles.buttonGray}
            onPressIn={this.handleDecrementBreak}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              -
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settings}>
          <TouchableOpacity
            style={{
              width: 130,
              height: 40,
              marginLeft: "auto",
              marginRight: 20,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(53, 53, 53)",
              borderStyle: "solid",
              borderWidth: 3,
              borderColor: "rgb(10, 7, 7)",
              borderRadius: 20,
            }}
            onPressIn={this._playAndPause}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              {!this.state.whiteNoise ? " 🔉 White Noise" : "🔇 White Noise"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    fontFamily: "Roboto",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                  >
                    🍅 Minidoro Clock
                  </Text>
                  {"\n\n"}
                  Minidoro Clock - is a minimalistic timer tool inspired by the
                  Pomodoro Technique invented by Francesco Cirillo. This tool's
                  main aim is to help us organize our study schedule and divide
                  sessions into short intervals called pomodoros (tomatoes),
                  traditionally 25 minutes long. In general our attention span
                  lasts for about 20 minutes, so keeping each of our the
                  sessions between 15 to 30 minutes should give us possibly the
                  best results.{"\n"} After each session, it is good to have a
                  short break (generally 5 to 15 minutes long), and then go back
                  to work for another session.{"\n\n"} -For each accomplished
                  session, you get one pomodoro 🍅{"\n"}-You can change study
                  time and break time{"\n"}
                  -There is a White Noise option available to focus even better
                  {"\n"}-Your pomodoros are reset daily{"\n"}-Collect as many as
                  you can {"\n\n"}Good luck!
                </Text>
                <Pressable
                  style={{
                    width: 130,
                    height: 40,
                    marginLeft: "auto",
                    marginRight: 20,
                    padding: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(53, 53, 53)",
                    borderStyle: "solid",
                    borderWidth: 3,
                    borderColor: "rgb(10, 7, 7)",
                    borderRadius: 20,
                  }}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{
                      color: "rgb(228, 231, 235)",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                  >
                    Hide Info
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={{
              width: 130,
              height: 40,
              marginLeft: "auto",
              marginRight: 20,
              padding: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(53, 53, 53)",
              borderStyle: "solid",
              borderWidth: 3,
              borderColor: "rgb(10, 7, 7)",
              borderRadius: 20,
            }}
            onPress={() => this.setModalVisible(true)}
          >
            <Text
              style={{
                color: "rgb(228, 231, 235)",
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              Show Info
            </Text>
          </Pressable>
        </View>
        <View style={styles.achievements}>
          <Text
            style={{
              color: "rgb(228, 231, 235)",
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {this.state.sessions.length === 0
              ? "Today you haven't finished any session yet"
              : this.state.sessions.length === 1
              ? "Today you have finished 1 session"
              : "Today you have finished " +
                this.state.sessions.length +
                " sessions"}
          </Text>
          <Text style={styles.pomos}>{this.state.sessions.join(" ")}</Text>
        </View>
      </View>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Image
          source={require("./assets/logopo.png")}
          style={{ width: 90, height: 90, marginLeft: "auto" }}
        />
        <Text
          style={{
            color: "rgb(228, 231, 235)",
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: 30,
            marginRight: "auto",
          }}
        >
          Minidoro Clock
        </Text>
      </View>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text
          style={{
            color: "rgb(228, 231, 235)",
            fontFamily: "Roboto",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Created by: Pawel Kowalewski
        </Text>
        <Text
          style={{
            color: "rgb(228, 231, 235)",
            textAlign: "center",
            fontFamily: "Roboto",
          }}
        >
          Act Reflect Persist Learn © All rights reserved
        </Text>
      </View>
    );
  }
}
