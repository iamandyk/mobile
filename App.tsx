import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useReducer, createContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Button, Input, Div } from "react-native-magnus";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import LogIn from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";
import * as SecureStore from "expo-secure-store";
import Main from "./src/screens/Main";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/api",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export const AuthContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      loginSetToken: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: data });
      },
      logout: () => dispatch({ type: "SIGN_OUT" }),
      signUpSetToken: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  useEffect(() => {
    const checkLoginState = async () => {
      const userToken = await SecureStore.getItemAsync("token");

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    checkLoginState();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            ) : (
              <Stack.Screen name="Main" component={Main} />
            )}
          </Stack.Navigator>
        </NavigationContainer>

        <StatusBar style="auto" />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
