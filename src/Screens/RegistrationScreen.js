import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Text,
  ImageBackground,
} from "react-native";

export default function Form() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const mailHandler = (text) => setMail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${name} ${mail} ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <ImageBackground
          source={require("../../assets/photo-BG-2x.jpg")}
          style={styles.image}
        >
        
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <View
                style={styles.formWrapper}
              >
            <Text>Регистрация</Text>
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Логин"
            style={styles.input}
          />
          <TextInput
            value={mail}
            onChangeText={mailHandler}
            placeholder="Адрес электронной почты"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title={"Зарегистрироваться"} style={styles.button} onPress={onLogin} />
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  formWrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
    // height: 600,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
});