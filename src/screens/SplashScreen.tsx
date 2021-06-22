import React from "react";
import { ActivityIndicator } from "react-native";
import { Div } from "react-native-magnus";

export default function SplashScreen() {
  return (
    <Div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </Div>
  );
}
