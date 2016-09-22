var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants'); 

var ActionTypes = AppConstants.ActionTypes;
import { postXHR } from '../scripts/XHR';


module.exports = {
    initUserDatas: function(){
        
        
    },
    logout: function(){  

    },
    
    login: function(User_AccountName, User_AccountPassword) {
        
        //it only get access token 
        var url = 'http://192.168.99.100:5000/token-auth'; 
        postXHR(
          url,
          {
            User_AccountName: User_AccountName,
            User_AccountPassword: User_AccountPassword,
          }, 
          null,
          ( response ) => {
              
                var response = JSON.parse(response); 
                localStorage.token = response.token;
                response.status = "connected";
                AppDispatcher.dispatch({
                  actionType: ActionTypes.LOGGED_IN,
                  data: response
                }); 
          },
          ( response ) => { 
              var response = JSON.parse(response); 
                response.status = "notconnected";
                AppDispatcher.dispatch({
                  actionType: ActionTypes.NOT_LOGGED_IN,
                  data: response
                }); 
          }
          ); 
    } 
};
