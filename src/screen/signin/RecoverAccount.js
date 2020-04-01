import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native'

import style from '../style'

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [loginPending, setLoginPending] = useState(false);
  const [recoverEmailResponse, setLRecoverEmailResponse] = useState(false);

  useEffect(() => {
    if(recoverEmailResponse){
      if(recoverEmailResponse.result.success){
        // RECOVERY SUCCESS
        Alert.alert(
          'Criação de Senha',
          recoverEmailResponse.result.message,
          [],
          { cancelable: true }
        )
      }else{
        setEmailErr(recoverEmailResponse.result.message)
      }
    }
  },[recoverEmailResponse])

  const validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const fetchRecoverEmail = async () => {
    let body = await JSON.stringify({
      email: email,
    });

    try {
      const apiCall = await fetch('https://hapi.meuvesti.com/api/appvendas/password/email', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: body
      })
      const jsonApiCall = await apiCall.json();
      setLRecoverEmailResponse(jsonApiCall)

    } catch (error) {
      console.log(error)
    }
    setLoginPending(false)
  }

  const handleRecoverEmailSubmit = () => {
    if(validateEmail()){
      setLoginPending(true);
      fetchRecoverEmail();
    }else{
      setEmailErr('E-mail inválido');
    }
  }

  return (
    <>
      <View >
        <Text style={[style.infoText, { marginHorizontal: 10, marginTop: 26.7 }]} >
          Insira seu email e enviaremos
        </Text>
        <Text style={[style.infoText, { marginHorizontal: 85 }]} >
          instruções de acesso:
        </Text>
      </View>
      
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"}>
      <TextInput
        style={[style.input, { marginTop: 20 }]}
        placeholder={'Email'}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
        onChangeText={(text) => {
          setEmail(text);
        }}
        onBlur={() => {
          if(!validateEmail()){
            setEmailErr('E-mail inválido');
          }else{
            setEmailErr('');
          }
        }}
      />
      </KeyboardAvoidingView>
      <View style={{width: 339,flexDirection: 'row', justifyContent: 'flex-start'}}>
      {
        !!emailErr && <Text style={style.inputError} >{emailErr}</Text>
      }
      </View>
      <TouchableOpacity
        style={style.largeWidthBtn}
        onPress={() => {
          handleRecoverEmailSubmit();
        }}
        disabled={!!emailErr || !email || !!loginPending}
      >
        {
          loginPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
              <Text style={style.textBtn} >Criar nova senha</Text>
            )
        }
      </TouchableOpacity>

    </>
  )
}

export default Login