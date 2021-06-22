import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Div } from "react-native-magnus";

export default function Home({ navigation }) {
  return (
    <Div
      p="sm"
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Welcome to FitFam 💪</Text>

      <Button
        w="100%"
        mb={4}
        fontWeight="bold"
        onPress={() => navigation.navigate("LogIn")}
      >
        Log In
      </Button>
      <Button
        w="100%"
        bg="#0D6CFF"
        fontWeight="bold"
        onPress={() => navigation.navigate("SignUp")}
      >
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
