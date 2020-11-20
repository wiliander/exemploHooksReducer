import {useReducer} from 'react';
import {sha256} from 'react-native-sha256';

const initialState = []

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'REMOVE':
      return state.filter(item => {
        return item.id !== action.id;
      });
    case 'CHECK':
      return state.map(item => {
        if (item.id === action.id) {
          return {...item, check: !item.check}; //atributo booleano
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};


export default () => {
  const [state, dispatch] = useReducer(reducer,initialState)

  const addItem = async title => {
    const hashId = await sha256(title);
      dispatch({
          type: 'ADD',
          item: {
              id: hashId,
              title: title,
              check: false
          }
      })
  };

  const checkItem = id => {
      dispatch({
          type: 'CHECK',
          id: id
      })
  };

  const removeItem = id => {
    dispatch({
        type: 'REMOVE',
        id: id
      });
  };

  return [state, addItem, checkItem, removeItem];
};

 
