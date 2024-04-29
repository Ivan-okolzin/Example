import { StyleSheet } from 'react-native';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  flatListContainer: {
    width: '100%',
    backgroundColor: Colors.light.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 34,
    color: '#000',
    marginTop: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#707070',
    marginTop: 17,
  },
  listHeaderText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  },
  scrollView: {
    marginTop: 16,
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
});

export default styles;
