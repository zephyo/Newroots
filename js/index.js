var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var data = {
  baseURL: '',
  graphicsURL: 'https://zephyo.github.io/treehacks/graphics/',
  activeTab: 0,
  userData: null,
  feed: [] },




userBase = 'users',

config = {
  apiKey: "AIzaSyBnWbqZC0wncY06pWlHX8DCbIM_EM9zrE8",
  authDomain: "day-7-messaging.firebaseapp.com",
  databaseURL: "https://day-7-messaging.firebaseio.com",
  projectId: "day-7-messaging",
  storageBucket: "day-7-messaging.appspot.com",
  messagingSenderId: "307150346579" };


firebase.initializeApp(config);var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));_this.









    setActiveTab = function (index) {
      _this.setState({
        activeTab: index });

    };_this.

    checkLogin = function (user, pass) {
      //check against database 
      //if (user)
      //if valid, set userData
      _this.setState({
        userData:
        {
          profileImage: '',
          name: 'Gloria Wang',
          username: 'gloria',
          lastCheckin: '02/14/2019',
          checkin: [
          {
            q: 'How are you feeling today?',
            type: 'range' },

          {
            q: 'Have you took your medication?',
            type: 'yesno' }] } });




    };_this.


    updateCheckin = function () {
      _this.setState({
        userData: _extends({},
        _this.state.userData, {
          lastCheckin: moment().format('L') }) });


    };_this.


    needToCheckin = function () {
      if (_this.state.userData.lastCheckin != moment().format('L')) {
        return true;
      } else
      {
        return false;
      }
    };_this.


    logout = function () {
      _this.setState({
        userData: null });

    };_this.state = data;return _this;}_createClass(App, [{ key: 'componentWillMount', value: function componentWillMount() {this.setState({ firebaseRef: firebase.database().ref(userBase) }, this.update);} // update this.state.lastCheckin as well as input checkin data to feed/database
    //check this.state.lastCheckin and see whether user has checked in today
    //logout
  }, { key: 'render', value: function render() {if (this.state.userData === null) {
        return (
          React.createElement(HomePage, {
            graphicsURL: this.state.graphicsURL,
            checkLogin: this.checkLogin }));


      }
      var activeTab;
      //active tab is feed
      if (this.state.activeTab == 0) {
        activeTab =
        React.createElement(FeedTab, null);

      }
      //active tab is network
      else if (this.state.activeTab == 1) {
          activeTab =
          React.createElement(NetworkTab, null);

        }
        //active tab is profile
        else {
            activeTab =
            React.createElement(UserTab, {
              logout: this.logout });


          }

      return (
        React.createElement('div', { className: 'container' },
          React.createElement('div', { className: 'bg' }),
          React.createElement('div', { className: 'main-bg-texture' }),
          React.createElement(NavBar, {
            graphicsURL: this.state.graphicsURL,
            setActiveTab: this.setActiveTab }),

          activeTab,
          this.needToCheckin() ?
          React.createElement(CheckinModal, {
            graphicsURL: this.state.graphicsURL,
            updateCheckin: this.updateCheckin }) :

          null));


    } }]);return App;}(React.Component);


var NavBar = function NavBar(props) {
  return (
    React.createElement('nav', { className: 'main-nav' },
      React.createElement('div', { className: 'nav-content' },
        React.createElement('img', { className: 'logo-img', src: props.graphicsURL + "icon.png" }),
        React.createElement('span', { className: 'logo' }, 'my_friends',
          React.createElement('span', { className: 'sublogo' }, 'give and get support.')),

        React.createElement('button', { id: 'feed-but', onClick: function onClick() {return props.setActiveTab(0);} }, React.createElement('span', { className: 'jam jam-messages-alt', style: { color: '#9FC6C1' } })),
        React.createElement('button', { id: 'network-but', onClick: function onClick() {return props.setActiveTab(1);} }, React.createElement('span', { className: 'jam jam-users', style: { color: '#9FC6C1' } })),
        React.createElement('button', { id: 'user-but', onClick: function onClick() {return props.setActiveTab(2);} }, React.createElement('span', { className: 'jam jam-user', style: { color: '#9FC6C1' } })))));



};var

FeedTab = function (_React$Component2) {_inherits(FeedTab, _React$Component2);
  function FeedTab(props) {_classCallCheck(this, FeedTab);return _possibleConstructorReturn(this, (FeedTab.__proto__ || Object.getPrototypeOf(FeedTab)).call(this,
    props));
  }_createClass(FeedTab, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      autosize($('textarea'));
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('section', { className: 'feed' },
          React.createElement('div', { className: 'create-thought' },
            React.createElement('textarea', { rows: '2', placeholder: 'Your thoughts' }),
            React.createElement('button', { id: 'update' }, 'update')),

          React.createElement('h1', { className: 'date-marker' }, 'February 15'),
          React.createElement('div', { className: 'checkin activity' },
            React.createElement('div', { className: 'header' },
              React.createElement('div', { className: 'pic' }), React.createElement('span', { className: 'name' }, 'Gloria Wang '), React.createElement('span', { className: 'sub' }, '\xA0checked in'), React.createElement('span', { className: 'date' }, 'A few seconds ago'),
              React.createElement('button', { className: 'user-edit' }, React.createElement('span', { className: 'jam jam-pencil', style: { color: '#EFF0DA' } }))),

            React.createElement('div', { className: 'content' },
              React.createElement('div', { className: 'mood' }, React.createElement('span', null, 'feeling '),
                React.createElement('div', { className: 'mood-icon' }, '5')),
              React.createElement('span', null, 'feeling better but still kinda sad because I don\'t know anyone in my dorm :/ is that just me?'),
              React.createElement('div', { className: 'mood' }, React.createElement('span', null, 'took meds '),
                React.createElement('div', { className: 'mood-icon' }, React.createElement('span', { className: 'jam jam-check', style: { color: '#EFF0DA' } })))),


            React.createElement('div', { className: 'leave-comment' },
              React.createElement('input', { type: 'text', placeholder: 'comment..' }),
              React.createElement('button', null, React.createElement('span', { className: 'jam jam-paper-plane', style: { color: '#9FC6C1' } })))),


          React.createElement('div', { className: 'thought activity' },
            React.createElement('div', { className: 'header' },
              React.createElement('div', { className: 'pic' }), React.createElement('span', { className: 'name' }, 'Brianna Burman'), React.createElement('span', { className: 'sub' }, '\xA0updated'), React.createElement('span', { className: 'date' }, '12 min ago')),

            React.createElement('div', { className: 'reply' }, React.createElement('span', null, 'worried/stressed abt interviews')),
            React.createElement('div', { className: 'comment' }, React.createElement('span', null, 'you got this!!')),
            React.createElement('div', { className: 'comment' }, React.createElement('span', null, 'So awesome you\u2019re planning for them! Since you\u2019re thinking about it, I\u2019m sure you\u2019ll be super prepared!')),
            React.createElement('div', { className: 'reply' }, React.createElement('span', null, 'thx guys :) i appreicate it')),
            React.createElement('div', { className: 'leave-comment' },
              React.createElement('input', { type: 'text', placeholder: 'comment..' }),
              React.createElement('button', null, React.createElement('span', { className: 'jam jam-paper-plane', style: { color: '#9FC6C1' } }))))));




    } }]);return FeedTab;}(React.Component);



var NetworkTab = function NetworkTab(props) {
  return (
    React.createElement('section', { className: 'network' },
      React.createElement('div', { className: 'header' },
        React.createElement('div', { className: 'search-bar' },
          React.createElement('input', { type: 'text', placeholder: 'search' }),
          React.createElement('button', { id: 'search-friends' }, React.createElement('span', { className: 'jam jam-user-search', style: { color: '#9FC6C1' } }))),

        React.createElement('button', { id: 'add-friends' }, React.createElement('span', { className: 'jam jam-user-plus', style: { color: '#9FC6C1' } }))),

      React.createElement('div', { className: 'friends' },
        React.createElement('div', { className: 'friend' },
          React.createElement('div', { className: 'pic' }), React.createElement('span', null, 'Felicia Wilson'),
          React.createElement('button', null, React.createElement('span', { className: 'jam jam-heart', style: { color: '#e38882' } }))))));




};var

UserTab = function (_React$Component3) {_inherits(UserTab, _React$Component3);
  function UserTab(props) {_classCallCheck(this, UserTab);return _possibleConstructorReturn(this, (UserTab.__proto__ || Object.getPrototypeOf(UserTab)).call(this,
    props));
  }_createClass(UserTab, [{ key: 'render', value: function render()

    {var _this4 = this;
      return (
        React.createElement('section', { className: 'user' },
          React.createElement('button', { id: 'edit' }, React.createElement('span', { className: 'jam jam-pencil', style: { color: '#9FC6C1' } })),
          React.createElement('div', { className: 'pic' }),
          React.createElement('h1', null, 'Gloria Wang'),
          React.createElement('div', { className: 'check-in-edit' },
            React.createElement('h2', null, 'Your Daily Check-in'),
            React.createElement('ul', null,
              React.createElement('li', null, 'How are you feeling today?'),
              React.createElement('li', null, 'Did you take your medication?')),

            React.createElement('button', null, 'add more ')),

          React.createElement('button', { id: 'logout-but', onClick: function onClick() {return _this4.props.logout();} }, 'logout')));


    } }]);return UserTab;}(React.Component);var


CheckinModal = function (_React$Component4) {_inherits(CheckinModal, _React$Component4);
  function CheckinModal(props) {_classCallCheck(this, CheckinModal);var _this5 = _possibleConstructorReturn(this, (CheckinModal.__proto__ || Object.getPrototypeOf(CheckinModal)).call(this,
    props));_this5.



























    setMood = function (event) {
      _this5.setState({ mood: event.target.value });
    };_this5.state = { mood: 4 };return _this5;}_createClass(CheckinModal, [{ key: 'componentDidMount', value: function componentDidMount() {$('input[type="range"]').each(function (index) {var range = $(this).parent().find('.indicator');var p = $(range).find('p');$(range).hide();$(this).focusin(function () {$(range).css('left', 'calc(' + $(this).val() * (1 / 7) * 100 + '% - 60px)');$(range).show();});$(this).focusout(function () {$(range).hide();});$(this).on('input', function () {$(range).css('left', 'calc(' + $(this).val() * (1 / 7) * 100 + '% - 60px)');$(p).text($(this).val());});});} }, { key: 'render', value: function render()

    {var _this6 = this;
      return (
        React.createElement('div', { className: 'modal-bg' },
          React.createElement('div', { className: 'checkin modal' }, React.createElement('img', { className: 'bg-texture first', src: this.props.graphicsURL + "flower.png" }), React.createElement('img', { className: 'bg-texture second', src: this.props.graphicsURL + "thing.png" }),
            React.createElement('div', { className: 'bg' }),
            React.createElement('h1', null, moment().format('MMMM D')),
            React.createElement('h1', { className: 'title' },
              React.createElement('div', { className: 'highlight' }), React.createElement('span', null, 'check-in')),

            React.createElement('h2', null, 'How are you feeling today?'),
            React.createElement('div', { className: 'mood-measurer' },
              React.createElement('input', { type: 'range', min: '1', max: '7', value: this.state.mood, onChange: function onChange(e) {return _this6.setMood(e);} }),
              React.createElement('div', { className: 'indicator' },
                React.createElement('p', null, '4')),

              React.createElement('div', { className: 'num' }, React.createElement('small', null, '1'), React.createElement('small', null, '7'))),

            React.createElement('textarea', { className: 'feelings', placeholder: 'How am I feeling? ..' }),
            React.createElement('h2', null, 'Did you take your medication?'),
            React.createElement('div', { className: 'yesno' },
              React.createElement('button', { className: 'yes' }, React.createElement('span', { className: 'jam jam-check', style: { color: 'white' } })),
              React.createElement('button', { className: 'no' }, React.createElement('span', { className: 'jam jam-close', style: { color: '#8A8184' } }, ' '))),

            React.createElement('button', { id: 'submit', onClick: function onClick() {return _this6.props.updateCheckin();} }, React.createElement('span', { className: 'jam jam-check', style: { color: '#9FC6C1' } })))));



    } }]);return CheckinModal;}(React.Component);var


HomePage = function (_React$Component5) {_inherits(HomePage, _React$Component5);
  function HomePage(props) {_classCallCheck(this, HomePage);var _this7 = _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this,
    props));_this7.






    setSignUp = function (bool) {
      _this7.setState({
        signingUp: bool });

    };_this7.

    setLogin = function (bool) {
      _this7.setState({
        loggingIn: bool });

    };_this7.state = { signingUp: false, loggingIn: false };return _this7;}_createClass(HomePage, [{ key: 'render', value: function render()

    {var _this8 = this;
      var content;
      if (this.state.loggingIn) {
        content =
        React.createElement('div', { className: 'login-page' },
          React.createElement('h2', null, 'my_friends',
            React.createElement('button', { className: 'back-but', onClick: function onClick() {return _this8.setLogin(false);} },
              React.createElement('span', { className: 'jam jam-arrow-left', style: { color: '#635358' } }))),


          React.createElement('input', { id: 'login-email', type: 'email', placeholder: 'email' }),
          React.createElement('input', { id: 'login-pass', type: 'password', placeholder: 'password' }),
          React.createElement('button', { className: 'login-but', onClick: function onClick() {return _this8.props.checkLogin($('#login-email').val(), $('#login-pass').val());} }, 'login'));


      } else if (this.state.signingUp) {
        content =
        React.createElement('div', null);



      } else {
        content =
        React.createElement('div', null,
          React.createElement('h2', null, 'my_friends'),
          React.createElement('p', null, 'give and get support from your support network. feel safe with the ones you trust.'),
          React.createElement('div', { className: 'buts' },
            React.createElement('button', { className: 'signup-but', onClick: function onClick() {return _this8.setSignUp(true);} }, 'sign up'),
            React.createElement('button', { className: 'login-but', onClick: function onClick() {return _this8.setLogin(true);} }, 'login')));



      }

      return (
        React.createElement('div', { className: 'home-page' },
          React.createElement('img', { className: 'bg-texture', src: this.props.graphicsURL + "hero.gif" }),
          React.createElement('img', { src: this.props.graphicsURL + "plants.png" }),
          content));


    } }]);return HomePage;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));