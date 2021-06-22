import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Div } from "react-native-magnus";
import { useForm, Controller } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../App";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authToken
      user {
        id
        username
        email
      }
    }
  }
`;

export default function LogIn() {
  const { loginSetToken } = useContext(AuthContext);
  const [login, { data, error: mutationError }] = useMutation(LOGIN_MUTATION, {
    //onError: () => null,
    onCompleted: (data) => loginSetToken(data.login.authToken),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    login({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <Div
      p="sm"
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            autoCapitalize="none"
            value={value}
            mb={4}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />

      {errors.email && <Text>Email is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="password"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            secureTextEntry={true}
            autoCapitalize="none"
            mb={4}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />

      {errors.password && <Text>Password is required.</Text>}

      <Button
        bg="#0D6CFF"
        w="100%"
        fontWeight="bold"
        onPress={handleSubmit(onSubmit)}
      >
        Log In
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
