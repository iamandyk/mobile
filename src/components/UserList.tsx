import React from 'react';
import { gql, useQuery } from '@apollo/client'
import { View, Text } from 'react-native'

const USERS_QUERY = gql`
    query Users {
        users {
            id
            name
            username
        }
    }
`;

export default () => {
    const { data, loading } = useQuery(USERS_QUERY);

    console.log({ data });

    if (loading || !data) return <Text>Loading...</Text>;

    return (
        <View>
            {data.users.map(user => <View key={user.id}><Text>{user.username}</Text></View>)}
        </View>
    )
}