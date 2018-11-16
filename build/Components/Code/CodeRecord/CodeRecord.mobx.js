import { observable, action, flow, computed } from "mobx"
import { storage } from "api"
import { toJS } from "mobx"
import { ajax } from "api"
import url from "url"

import ScrollViewState from "../../page/ScrollView/ScrollView.mobx.js";



export default class CodeRecordState {
    constructor(query){
        this.query=query
        this.ScrollViewState = new ScrollViewState()
    }
    //@observable List = [];
    getCodeRecorList = flow(function* () {
        try {
            const result = yield this.ScrollViewState.loadInitData({
                url: "/api/User_Account_QRCode_Person/ListAsync",
                data: { user_Account_QRCodeId: this.query['Id'] }
            })

        } catch (error) {
            throw error
        }
    })
}