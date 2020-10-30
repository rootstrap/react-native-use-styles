import { Styles } from 'react-native-use-styles';

export default Styles({
  computed: {
    disabled: ([isDisabled]) => ({
      color: isDisabled ? '$disabled' : '$clouds',
    }),
  },
  centered: 'txt:align:center',
});
