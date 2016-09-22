 
 import React from 'react';
 import auth from '../auth'
  const Logout = React.createClass({
  componentDidMount() {
    document.title = "MyApp | LogoutPage"
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

export default Logout;