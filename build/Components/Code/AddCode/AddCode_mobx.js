import { observable, action, flow, computed } from "mobx";
import { ToJS } from "mobx";
import { ajax } from "api";

export default class AddCodeState {
  @observable List = [];
  getAddCodeList=flow(function *() {
      try{
            const result = yield ajax.post({
                url:"",
                data:{}
            })
      }catch(error){
          throw(error)
      }
  })
}
