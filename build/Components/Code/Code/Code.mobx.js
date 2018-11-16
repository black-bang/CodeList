import {observable,action,flow,computed} from "mobx"
import {storage} from "api"
import {toJS} from "mobx"
import {ajax} from "api"
import  url  from "url"



export default class CodeState {
	
	@observable List=[];
	getCodeList=flow(function*(){
		try{
			const result=yield ajax.get({
				url: "/api/User_Account_QRCode/ListAsync",
				data: { translateId: storage.loginInfo.TranslateId }
			})
			console.log(storage.loginInfo.TranslateId);
			this.List=result;
			
			//console.log(result);
		}catch(error){
			throw error
		}
	})
}