import React, {useState, useReducer} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import Colors from '../../styles/colors';

import useMarketList from '../../hooks/useMarketList'

//codigo um pouco verboso pq nao estou usando o styled Components
//esse código é algo mais didático nao é algo tanto profissional, mas é mais ou menos como trabalho e crio meus componentes
const Main = () => {
  //hook
  const [product, setProducts] = useState('');

  //hook personalizado
  const [state, addItem, checkItem, removeItem] = useMarketList()

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar produto"
          value={product}
          onChangeText={text => setProducts(text)}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            addItem(product)
            setProducts('');
          }}>
          <Text style={styles.addBtnTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={state}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  checkItem(item.id)
                }}>
                <Text
                  style={[
                    styles.listItem,
                    item.check ? styles.itemChecked : '',
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeItem}
                onPress={() => {
                  removeItem(item.id)
                }}>
                <Text style={styles.removeItemText}>excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    width: '80%',
    fontSize: 30,
    color: Colors.black,
  },
  addBtn: {
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addBtnTxt: {
    color: Colors.red,
    fontSize: 60,
  },
  listItem: {
    fontSize: 22,
    padding: 20,

    marginVertical: 3,
    marginHorizontal: 5,
  },
  itemChecked: {
    textDecorationLine: 'line-through',
  },
  removeItem: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  removeItemText: {
    fontSize: 16,
    color: Colors.red,
    marginHorizontal: 10,
  },
});

export default Main;
