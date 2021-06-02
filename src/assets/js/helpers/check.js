import CheckConfig from "../configs/checkConfig";

export default {
  methods: {
    isIllegalAct( act ) {
      const index = CheckConfig.findIndex( item => {
        return item.value == act;
      })

      return index == -1;
    }
  }
}
