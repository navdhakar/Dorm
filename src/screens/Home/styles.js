import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    justifyContent: 'center',
 
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    width: '70%',
    marginLeft: 25,

  },
  button: {
    backgroundColor: '#38d3ae',
    width: 100,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#fff"
  },

  searchButton: {
    backgroundColor: '#fff',
    height: 60,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    zIndex: 100,

  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:60
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
   
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
