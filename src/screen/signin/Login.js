import React, { useState } from 'react';

import { View, Text, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

import style from '../style'

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [loginPending, setLoginPending] = useState(false);
  const [signinRespose, setSigninRespose] = useState({});
  const [signinMsgRespose, setSigninMsgRespose] = useState({});

  const validateEmail = (_email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_email).toLowerCase());
  }

  const fetchLogin = async () => {
    let body = await JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const apiCall = await fetch('https://hapi.meuvesti.com/api/appvendas/login',{
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: body
      })
      const jsonApiCall =  await apiCall.json();
      if(jsonApiCall.result.success){
        setSigninMsgRespose(jsonApiCall.result)
        setSigninRespose(jsonApiCall.result)
      }else{
        setSigninMsgRespose(jsonApiCall.result)
      }
    } catch (error) {
      console.log(error)
    }
    setLoginPending(false)
  }

  const handleSigninSubmit = () => {
    setLoginPending(true)
    fetchLogin();
  }

  return (
    <View style={{ marginTop: 41.6 }}>

      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"}>
        <TextInput
          style={style.input}
          placeholder={'Email'}
          keyboardType={"email-address"}
          onChangeText={(text => {
            setEmail(text);
          })}
          autoCapitalize={'none'}
          onBlur={() => {
            if (!validateEmail(email)) {
              setEmailErr('E-mail inválido')
            } else {
              setEmailErr('')
            }
          }}
        />
      </KeyboardAvoidingView>

      {
        !!emailErr && <Text style={style.inputError}>{emailErr}</Text>
      }

      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"}>
        <TextInput
          style={style.input}
          placeholder={'Senha'}
          secureTextEntry={true}
          onChangeText={(text => {
            setPassword(text);
          })}
        />
      </KeyboardAvoidingView>


      <TouchableOpacity
        style={style.largeWidthBtn}
        disabled={!!emailErr || !!password === false}
        onPress={() => {
          handleSigninSubmit()
        }}
      >
        {
          loginPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
              <Text style={style.textBtn} >Entrar</Text>
            )
        }
      </TouchableOpacity>

        {
          !!signinMsgRespose && !loginPending && (
            <Text style={signinMsgRespose.success ? style.toastSuccess : style.toastWarning} >{signinMsgRespose.message}</Text>
          ) 
        }

      <TouchableOpacity
        style={style.subInfoLogin}
        onPress={() => {
          props.setHandleScreen('recoverAccount');
        }}
      >
        <Text
          style={style.textSubInfoLogin}
        >
          Esqueceu sua Senha?
        </Text>
      </TouchableOpacity>
    </View>

  )
}

export default Login