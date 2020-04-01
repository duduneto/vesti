import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  arrowTop: {
    height: 2,
    width: 18,
    backgroundColor: '#545454',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    top: 20,
    left: 5
  },
  arrowBottom: {
    height: 2,
    width: 18,
    backgroundColor: '#545454',
    borderRadius: 2,
    transform: [{ rotate: '135deg' }],
    top: 6,
    left: 5
  },
  arrowBody: {
    height: 2, width: 25, backgroundColor: '#545454', left: 8, top:10,borderRadius: 2
  },
  container: { marginTop: 79.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'},
  input:{height: 42, width: 339, borderWidth: 0.8, borderColor: '#cccccc', borderRadius: 2, marginTop: 13, paddingHorizontal: 13},
  inputError: {fontSize: 13, color: '#be3035'},
  logo: {height: 83.7, width: 136},
  largeWidthBtn: { height: 44, width: 339, marginTop: 18, backgroundColor: '#303030', borderRadius: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  textBtn: { fontSize: 17, color: '#fff', fontWeight: 'bold' },
  toastSuccess: {color: '#3eb656'},
  toastWarning: {color: '#be3035'},
  subInfoLogin: { width: 339, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 },
  textSubInfoLogin: { color: '#8e8e8e', fontSize: 16 },
  infoText: { color: '#525252', fontSize: 16, textAlign: 'center'},
})

export default style