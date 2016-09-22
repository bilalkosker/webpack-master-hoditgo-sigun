/* @flow weak */

export function postXHR( url : string, jsondata : any, authorization: any, onSuccess , onFailure )
{
  console.log('postXHR: posting to ' + url + ', ' + JSON.stringify( jsondata ) );

  var xhr = new XMLHttpRequest( );
  xhr.open( 'POST', url );
  xhr.setRequestHeader( 'Content-Type', 'application/json' );
  xhr.setRequestHeader('Access-Control-Allow-Methods','GET, POST, PUT,OPTIONS');
  xhr.setRequestHeader('Access-Control-Allow-Origin','http://192.168.99.100:3000'); 
  if(authorization){
       xhr.setRequestHeader('Authorization','Bearer '+ authorization);
  }
  xhr.onreadystatechange = function( )
  {
    if( xhr.readyState == 4 )
    {
      if( xhr.status == 200 )
      {
        console.log( 'postXHR: success from ' + url + ', ' + xhr.responseText );
        onSuccess( xhr.responseText );
      }
      else
      {
        console.log( 'postXHR: fail from ' + url + ', ' + xhr.responseText );
        onFailure( xhr.responseText );
      }
    }
  }

  xhr.send( JSON.stringify( jsondata ) );
}


export function getXHR( url : string, jsondata : any, authorization: any, onSuccess , onFailure )
{
    console.log('getXHR: posting to ' + url + ', ' + JSON.stringify( jsondata ) );

      var xhr = new XMLHttpRequest( );
      xhr.open( 'GET', url );
      xhr.setRequestHeader( 'Content-Type', 'application/json' ); 
        xhr.setRequestHeader('Access-Control-Allow-Methods','GET, POST, PUT,OPTIONS');
  xhr.setRequestHeader('Access-Control-Allow-Origin','*'); 
  xhr.setRequestHeader('access-control-allow-origin','*'); 
      if(authorization){
           xhr.setRequestHeader('Authorization','Bearer '+ authorization);
      }
    xhr.onreadystatechange = function() {
        if( xhr.readyState == 4 )
        {
          if( xhr.status == 200 )
          {
            console.log( 'getXHR: success from ' + url + ', ' + xhr.responseText );
            onSuccess( xhr.responseText );
          }
          else
          {
            console.log( 'getXHR: fail from ' + url + ', ' + xhr.responseText );
            onFailure( xhr.responseText );
          }
        }
    }; 
    xhr.send();  
}

