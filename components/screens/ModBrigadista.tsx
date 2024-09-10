import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function ModBrigadista() {
  const [tableHead, setTableHead] = useState(['Cedula', 'Nombre', 'Programa']);
  const [tableData, setTableData] = useState([
    ['123', 'Juan Quintero', 'Ing. sistemas'],
    ['124', 'Jean Arias', 'Ing. sistemas'],
    ['125', 'Geraldine Romero', 'Ing. sistemas']
  ]);


  const widthArr = [100, 100, 100]; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista comunidad uam</Text>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
        <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  head: { height: 50, backgroundColor: '#f1f8ff' },
  headText: { margin: 10, fontSize: 16, fontWeight: 'bold' },
  text: { margin: 10, fontSize: 12 },
});
