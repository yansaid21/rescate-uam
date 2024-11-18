import React from 'react';
import { Text, View } from 'react-native';
import UsersStadistics from '../molecules/UsersStadistics';

const UsersStatus: React.FC = () => {
  return (
    <View>
      <UsersStadistics titleText='Estado estudiantes' />
      <UsersStadistics titleText='Estado brigadistas' />
    </View>
  );
};

export default UsersStatus;
