import React, { useContext } from "react";
import { Div, Text, Button } from "react-native-magnus";
import { AuthContext } from "../../App";

export default function Main() {
  const { logout } = useContext(AuthContext);

  return (
    <Div>
      <Text>Logged in!</Text>
      <Button onPress={() => logout()}>Log Out</Button>
    </Div>
  );
}
