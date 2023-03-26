import React, { useState , useCallback, useEffect} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform, 
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const initialState = {
  name: "",
  mail: "",
  password: "",
};

export default function Registration({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width - 20 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2
      setDimensions(width)
    }
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  const [fontsLoaded] = useFonts({
    RobotoMedium: require('../../../assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('../../../assets/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View 
      
      style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
          source={require("../../../assets/photo-BG-2x.jpg")}
          style={styles.image}
        >
        
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View>
            <View 
                style={{
                  ...styles.formWrapper,

                  ...Platform.select({
                    ios: {
                      paddingBottom: isShowKeyboard ? 20 : 20,
                     
                    },
                    android: {
                      marginTop: isShowKeyboard ? -100 : 0,
                      
                    },
                  }),
                }} 
              >
                <View style={styles.imgBox}>
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/plus.png")}
                  />
                </View>
            <Text style={styles.title}>Регистрация</Text>
            <View style={{
                    ...styles.form,
                    paddingBottom: isShowKeyboard ? 32 : 45,
                    width: dimensions,
                  }}>
          <TextInput
            placeholder="Логин"
            style={styles.input}
            value={state.name}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
            onChangeText={(value) => setState((prevState) => ({...prevState, name: value}))}
          />
          <TextInput
            placeholder="Адрес электронной почты"
            style={styles.input}
            value={state.mail}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
            onChangeText={(value) => setState((prevState) => ({...prevState, mail: value}))}
          />
          <TextInput
            placeholder="Пароль"
            
            style={styles.input}
            value={state.password}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
            onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
          />
          </View>
          <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.aside}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          </View>
          </View>
        </KeyboardAvoidingView>
        
        
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  formWrapper: {
     alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    paddingTop: 100,
    
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  form: {
    alignItems: 'center',
    marginHorizontal: 16,
    paddingBottom: 32,
  },
  input: {
    fontFamily: "RobotoRegular",
    width: 300,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  button: {
    fontFamily: "RobotoRegular",
    width: 300,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    lineHeight: 19,
    color: "#FFFFFF",
  },
  aside: {
    fontFamily: 'RobotoRegular',
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  icon: {
    position: "absolute",
    left: "90%",
    top: "65%",
    width: 25,
    height: 25,
    borderRadius: '100%',
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-15%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  title: {
    // fontFamily: "RobotoMedium",
    fontFamily: 'RobotoMedium',

    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
    marginBottom: 20,
  },
});