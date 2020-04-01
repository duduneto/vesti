import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native'

import Login from './Login';
import RecoverAccount from './RecoverAccount';
import style from '../style'

const Signin = () => {

  const [handleScreen, setHandleScreen] = useState('')

  return (
    <>
      <View style={{ backgroundColor: '#fff', width: '100%', height: 50 }}>
        {!!handleScreen && ( 
          <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={() => setHandleScreen('')}
        >
          <View style={{ marginTop: 10, marginLeft: 4 }}>
            <View style={style.arrowTop} />
            <View style={style.arrowBottom} />
            <View style={style.arrowBody} />
          </View>
        </TouchableOpacity>
        )}
      </View>

      <View style={style.container}>

        {/* LOGO */}
        <View>
          <Image style={style.logo} source={require('../../assets/images/logo.png')} />
        </View>

        {
          handleScreen === 'recoverAccount' ? (
            <RecoverAccount />
          ) : (
              <Login setHandleScreen={setHandleScreen} />
            )
        }
      </View>
    </>
  )
}

export default Signin