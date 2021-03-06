 window.fbAsyncInit = function() {
  FB.init({
    appId      : '515944375139426', // App ID
    //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to accessthe session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScriptevent. This event is fired
  // for any authentication related change, such as login, logout orsession refresh. This means that
  // whenever someone who was previously logged out tries to log inagain, the correct case below
  // will be handled.
FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs.
    if (response.status === 'connected') {
      // The response object is returned with a status field that letsthe app know the current
      // login status of the person. In this case, we're handling thesituation where they
      // have logged in to the app.
      loggedIn();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but notnto the app, so we call
      // FB.login() to prompt them to do so.
      // In real-life usage, you wouldn't want to immediately promptsomeone to login
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by mostbrowsers unless they
      // result from direct interaction from people using the app(such as a mouse click)
      // (2) it is a bad experience to be continually prompted tologin upon page load.
      notRegistered();
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so wecall the login()
      // function to prompt them to do so. Note that at this stagethere is no indication
      // of whether they are logged into the app. If they aren't thenthey'll see the Login
      // dialog right after they log in to Facebook.
      // The same caveats as above apply to the FB.login() call here.
      notLoggedIn();
      FB.login();
        }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
