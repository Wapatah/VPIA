/* --------------------------------------------------------------------------------------------------------------------------------------------
  This is the login page logic and functions relating to signing in.
*/
import React from "react";
import { hashHistory, Link } from "react-router";
import StatusAlert, { StatusAlertService } from "react-status-alert";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      hidden: true,
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // On load, if there is a user token, get redirected to home.
  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      hashHistory.push("landing");
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Authenticate the login input
  handleSubmit(e) {
    e.preventDefault();
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    var myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var myInit = {
      method: "POST",
      headers: myHeaders,
      body:
        "email=" +
        encodeURIComponent(email) +
        "&password=" +
        encodeURIComponent(password)
    };

    var that = this;

    fetch("/api/authenticate", myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        if (response.error.error) {
          StatusAlertService.showError(response.error.message);
        } else {
          window.localStorage.setItem("userToken", response.data.token);
          window.localStorage.setItem("admin", response.data.user.admin);
          window.localStorage.setItem("user_id", response.data.user.id);
          window.localStorage.setItem("userEmail", response.data.user.token);
          hashHistory.push("landing");
          StatusAlertService.showSuccess("You are now logged in");
        }
      });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------
  // Render the log in page.
  render() {
    return (
      <div className="fullpage container-fluid">
        <StatusAlert />
        <div className="full-page row">
          <div className="col-lg-8 BGimage image-fade hidden-lg-down">
            <div className="image-tint-dark"></div>
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active btn btn-outline-light mx-2"
                >
                  About
                </button>

                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                  className="btn btn-outline-light mx-2"
                >
                  Community
                </button>

                <button
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                  className="btn btn-outline-light mx-2"
                >
                  Benefits
                </button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        About
                        <br />
                        the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean varius augue ut neque lacinia, a mattis lorem
                    commodo. Suspendisse potenti. Proin ultricies diam et urna
                    tincidunt tincidunt. Sed facilisis consectetur faucibus. In
                    vitae dolor quis mi fringilla condimentum non ut nulla. Sed
                    ornare erat diam, sed ultrices magna faucibus condimentum.
                    Vivamus in ullamcorper quam. Integer vel dapibus nisl. Nam
                    lacinia, neque vitae bibendum egestas.
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
                <div className="carousel-item">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        Community
                        <br />
                        of the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean varius augue ut neque lacinia, a mattis lorem
                    commodo. Suspendisse potenti. Proin ultricies diam et urna
                    tincidunt tincidunt. Sed facilisis consectetur faucibus. In
                    vitae dolor quis mi fringilla condimentum non ut nulla. Sed
                    ornare erat diam, sed ultrices magna faucibus condimentum.
                    Vivamus in ullamcorper quam. Integer vel dapibus nisl. Nam
                    lacinia, neque vitae bibendum egestas.
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
                <div className="carousel-item">
                  <div className="header-container">
                    <div className="header-item">
                      <h1 className="signin-carousel text-uppercase">
                        Benefits
                        <br />
                        of the VPIA
                      </h1>
                    </div>
                    <div className="header-item">
                      <img
                        src="../assets/images/logo-white-notext.png"
                        width="110px"
                        height="auto"
                        alt="VPIA logo"
                        aria-label="VPIA logo"
                        className="float-right"
                      />
                    </div>
                  </div>
                  <p className="signin-carousel">
                    <ul>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Consectetur adipiscing elit</li>
                      <li>Integer molestie lorem at massa</li>
                      <li>Facilisis in pretium nisl aliquet</li>
                      <li>Nulla volutpat aliquam velit</li>
                    </ul>
                  </p>
                  <button className="btn btn-outline-light">Learn More</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 right-panel">
            <img
              src="../assets/images/logo.png"
              width="124px"
              height="auto"
              alt="VPIA logo"
              aria-label="VPIA logo"
            />
            <div className="container login-box row">
              <div className="col-md-12 col-sm-12">
                <div className="col-sm-12">
                  <h1 className="welcome-message">
                    Aaniin/Tanisi/Hello Welcome back!
                  </h1>
                </div>
                <form className="col-sm-12">
                  <div className="form-group login-form">
                    <input
                      className="form-control"
                      id="inputEmail"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  <div className="form-group input-group login-form">
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      type={this.state.hidden ? "password" : "text"}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary append-light "
                        aria-label="show password"
                        onClick={this.toggleShow}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      onClick={this.handleSubmit}
                      className="btn btn-primary btn-block mt-5"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-block join-btn"
                    >
                      <Link to="/user_signup" className="none-deco">
                        New to VPIA? Join Now!
                      </Link>
                    </button>
                  </div>
                  <Link
                    to="landing"
                    aria-label="Go to home page"
                    className="none-deco"
                  >
                    <p class="font-italic text-sm-left return-text">
                      Return to homepage
                    </p>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
