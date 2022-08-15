
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity,
FlatList, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';
import {showToast} from '../../store/modules/toast/actions'
import {useDispatch} from 'react-redux'

import {getData} from '../../utils/storage'

import api from '../../services/api'
import { useLogin } from '../../context/LoginProvider';
import Container from '../../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../styles/Colors';


const {width} = Dimensions.get('window')

const ProductItem = ({ route }) => {
  let item = route.params
  const {profile} = useLogin()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [verify, setVerify] = useState(false)
  const comments = item.comments

  const images = [
    {
      id: 1,
      image: item.images[0]
    },
    {
      id: 2,
      image: item.images[1]
    },
    {
      id: 3,
      image: item.images[2]
    }
  ]

  const vefiryExistFavorite = async () => {
    const user = await getData().then()
    let verify = await api.get('/user/favorites', {params: {userId: user.id}}).then(res => res.data)
    const valid = verify.map(({_id}) => _id).includes(item._id)
    setVerify(valid)
  }

  useEffect(() => {
    if(profile.seller === false) {
      vefiryExistFavorite()
    }
  }, [verify])

  const addToFavorites = async (item) => {
    const user = await getData().then()
    let favorites = await api.get('/user/favorites', {params: {userId: user.id}})
      .then(res => res.data)
      // .catch((error) => dispatch(showToast(error.response.data, 'error', 'error')))
    const validExist = favorites.map(({_id})=>_id).includes(item)

    try {
      if(validExist) {
        await api.delete('/user/favorites/delete', {params: {userId: user.id, productId: item}})
          .then(res => dispatch(showToast(res.data, 'success', 'done')))
          .catch((error) => dispatch(showToast(error.response.data, 'error', 'error')))
      } else {
        const res = await api.post('/user/favorites/new', {}, {
          params: {productId: item, userId: user.id}
        })
        dispatch(showToast(res.data, 'success', 'favorite'))
      }
    } catch (error) {
      dispatch(showToast(error.response.data, 'error', 'error'))
    }
  }

  const OnBoardingItem = ({item}) => {
    return (
      <Image source={{uri: item.image}} style={styles.image} />
    )
  }
  
  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          style={{marginTop: 2}}
          onPress={navigation.goBack}
        >
          <Icon name="arrow-back" size={30} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Produto
        </Text>
        {profile.seller === false && (
          <TouchableOpacity
            onPress={() => addToFavorites(item._id)}
            style={{position: 'absolute', right: 15, top: 13}}
          >
            <Icon 
              name={verify === true ? "favorite" : "favorite-outline"}
              size={34}
              color={Colors.primary}
              />
          </TouchableOpacity>
        )}
      </View>
      <KeyboardAwareScrollView
        extraScrollHeight={15}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratings}>
            <Icon style={styles.star} name="star" size={24} color={Colors.gold} />
            <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.black}}>
              5.0
            </Text>
            <Text style={{fontSize: 14, paddingLeft: 8, color: Colors.grey}}>
              (1120)
            </Text>
          </View>
          <FlatList
            data={images}
            style={{width: width, height: 355}}
            pagingEnabled
            horizontal
            onMomentumScrollEnd={(event) => 
              setActiveIndex(parseInt((event.nativeEvent.contentOffset.x / width) + 0.3))}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(item + index)}
            renderItem={({item}) => <OnBoardingItem item={item} />}
          />
          {
            item.images.length > 1 ?
              <View style={styles.dotsContainer}>
                {
                  item.images.map((_, i) => (
                    <View
                      key={i}
                      style={[styles.dot, {backgroundColor: i === activeIndex ? Colors.primary : '#d4d4d4'}]}
                    />
                  ))
                }
              </View>
            : <></>
          }
          <Text style={[styles.price, {marginTop: item.images.length === 1 ? 20 : 0}]}>
            R$ {item.price}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.titleDescription}>Descrição</Text>
            <Text numberOfLines={3} style={styles.description}>Bolo de Doce de Leite com uasduasdhauhfashf 
            ausgdsauhfahahfs auhfuashfuasfuhauahuvhvhuasfuasbviabib  aufbasubhiaufhiubh</Text>
          </View>
          {profile.seller === false && (
            <View style={styles.vendorContainer}>
              <Text style={{fontSize: 16, color: Colors.black}}>Vendido por </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Seller', item)}>
                <Text style={{color: Colors.primary, fontSize: 16, textTransform: 'uppercase'}}>
                  {item.seller.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>
              Comentários
            </Text>
            {comments.map((result) => (
              <View key={result => result.id} style={{marginBottom: 10}}>
                <Text style={{textTransform: 'capitalize', fontWeight: 'bold', color: '#000'}}>
                  {result.name}
                </Text>
                <Text style={{color: '#000', fontSize: 15}}>
                  - {result.comment}
                </Text>
              </View>
            ))}
            {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
              <TextInput
                placeholder='Comentar'
                placeholderTextColor="#aaa"
                multiline={true}
                style={styles.commentInput}
                onChangeText={text => setInput(text)}
              />
              <TouchableOpacity style={styles.sendCommentBtn}>
                <Icon name="send" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    elevation: 9,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    color: Colors.primary,
    marginTop: 3,
    paddingLeft: 10
  },
  image: {
    width,
    height: width,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2
  },
  price: {
    color: Colors.black,
    fontSize: 28,
    paddingLeft: 20,
    fontWeight: '300',
  },
  productName: {
    color: Colors.primary,
    fontSize: 16,
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 20
  },
  ratings: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -5,
    marginBottom: 10
  },
  star: {
    marginTop: -4
  },
  detailsContainer: {
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 10
  },
  titleDescription : {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.black
  },
  description: {
    color: Colors.grey,
    fontSize: 16,
    textAlign: 'auto',
  },
  vendorContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 5
  },
  commentsContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  commentsTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    marginBottom: 20,
    color: Colors.primary
  },
  sendCommentBtn: {
    position: 'absolute',
    right: 5,
    top: 10
  }
});

export default ProductItem;