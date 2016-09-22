/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 
import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
var jwt = require('jwt-simple');

const change = 'change';
 
class AuthStore extends EventEmitter {
    constructor() {
        super()
        this.AuthData = {}; 
        if( localStorage.token){
            this.setAuthData({
                status:'connected', 
                token: localStorage.token
            });
        }
        
        this.userPictureData = {};
    }
    
    setAuthData(data) { 
        this.AuthData = data; 
        this.emitChange();
    }

    get loggedIn() {  
        if (!this.AuthData) {
            return;
        } 
        return this.AuthData.status == 'connected';
    }
    get userId() {
        if (!this.AuthData || !this.AuthData.response) {
            return;
        }

        return this.AuthData.response.userID;
    }
    get token (){
       /*if (!this.AuthData || !this.AuthData.response) {
            return;
        }*/

        return this.AuthData.token;
    } 
    get accessToken() {
        if (!this.AuthData || !this.AuthData.response) {
            return;
        }

        return this.AuthData.response.accessToken;
    }
    get pictureUrl() {
        if (!this.pictureData || !this.pictureData.url) {
            return;
        }

        return this.pictureData.url;
    }

    setPictureData(type, data) {
        this.pictureStatus = type;

        if (data) {
            this.pictureData = data.data 
        } else {
            this.pictureData = {};
        }

        this.emitChange();
    }

    // Emit Change event
    emitChange() {  
      this.emit(change);
    }

    // Add change listener
    addChangeListener(callback) {  
      this.on(change, callback);
    }

    // Remove change listener
    removeChangeListener(callback) { 
      this.removeListener(change, callback);
    }
};

const authStore = new AuthStore();
 
authStore.dispatchToken = AppDispatcher.register((action) => { 
    if (action.actionType == AppConstants.ActionTypes.LOGGED_IN) {
        setTimeout(
                 function(){
                    authStore.setAuthData(action.data); 
                 }, 500);
    } 
    
    if (action.actionType == AppConstants.ActionTypes.INITIALIZED) {
        authStore.setAuthData(action.data);
    }
 
    if (action.actionType == AppConstants.ActionTypes.LOGGED_OUT) { 
        authStore.setAuthData(action.data);
    }

    if (action.actionType == AppConstants.ActionTypes.GETTING_PICTURE) {
        authStore.setPictureData(action.actionType, action.data)
    }

    if (action.actionType == AppConstants.ActionTypes.RECEIVED_PICTURE) {
        authStore.setPictureData(action.actionType, action.data)
    }
})

module.exports = authStore; 
