import { observable, action, flow, computed } from "mobx"
import { ajax } from "api";

export default class UpdataCodeState {
    @observable DatailList = new Map();
   getUpdataCodeList = flow(function*() {
    try {
      const result = yield ajax.get({
        url: "/api/User_Account_QRCode/ModelAsync/",
        data: { id: 1 }
      });

      this.DatailList =observable.map(result);
      console.log(result);
    } catch (error) {
      throw error;
    }
  });
}
