import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Div } from "react-native-magnus";

export default function Home({ navigation }) {
  return (
    <Div p="sm" style={{ height: "100%" }}>
      <Text>Welcome to FitFam 💪</Text>

      <Button onPress={() => navigation.navigate("LogIn")}>Log In</Button>
      <Button onPress={() => navigation.navigate("SignUp")} bg="#0D6CFF">
        Sign Up
      </Button>
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
