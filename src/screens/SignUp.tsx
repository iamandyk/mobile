import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Div } from "react-native-magnus";

export default function SignUp() {
  return (
    <Div
      p="sm"
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Input placeholder="username" />

      <Button bg="#0D6CFF">Sign Up</Button>
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
