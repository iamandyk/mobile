import React from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Div } from "react-native-magnus";

export default function LogIn() {
  return (
    <Div p="sm" style={{ height: "100%" }}>
      <Input placeholder="email" />
      <Input placeholder="password" />

      <Button bg="#0D6CFF">Log In</Button>
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
