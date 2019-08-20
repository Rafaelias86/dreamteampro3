import React, { Component } from "react";
import logo from "./cards.png";
import "./Payment.scss";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API";

require('dotenv').config();

class Payment extends Component {

  state = {
    loggedIn: false,
    user: null,
   
    }

  constructor() {
    super();

    this.state = {
      isLoading: false,
      stripeToken: null
    };

    // configure Stripe Checkout
    this.stripeHandler = window.StripeCheckout.configure({
      key: "pk_test_Fvlh9tTAOqPUmkpNnSFz7Jsk00qaIR1ha4",
      image: "/assets/images/car.png",
      locale: "auto",
      token: this.onGetStripeToken.bind(this)
    });
  }

  onGetStripeToken(token) {
    // Got Stripe token. This means user's card is valid!
    // We need to continue the payment process by sending this token to our own server.
    // More info: https://stripe.com/docs/charges
    this.setState({ stripeToken: token });
  }

  onClickPay(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    const onCheckoutOpened = () => {
      this.setState({ isLoading: false });
    };

    // open Stripe Checkout
    this.stripeHandler.open({
      name: "EZ Valpark",
      description: "Thank you for parking with us",
      amount: 1000, // 10 USD -> 1000 cents
      currency: "usd",
      opened: onCheckoutOpened.bind(this)
    });
  }

   componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });
        //console.log(this.props)
    }

  render() {
    var buttonText = this.state.isLoading ? "Please wait ..." : "Pay $10";
    var buttonClassName =
      "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "");
    if (this.state.stripeToken) {
      buttonText = "✅ Payment Successful";
      buttonClassName = "Pay-Now Pay-Now-Disabled";
      //window.location='/dashboard';
    }
    return (
      <div className="Pay dashboardPage">
          {this.state.loggedIn ? (
            <div className="Pay1">
              <div className="Pay-header">
                <h1 className="my-3">Payment Option</h1>
                <img src={logo} className="my-3 Pay-logo" alt="logo" />         
              </div>
              {/* <p className="Pay-intro">
                {
                  "Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in Pay.js with your own key."
                }
              </p> */}
              {/* {this.state.stripeToken ? (
                <p className="Pay-intro">
                  {process.env.SKEY +
                    this.state.stripeToken.id +
                    ". Continue payment process in the server."}
                </p>
              ) : null} */}
              <a
                className={buttonClassName}
                href="/pay"
                onClick={this.onClickPay.bind(this)}
              >
                {buttonText}
              </a>
              </div>

              ) :
                (
                    <div className="noUser">
                      {!this.state.loading ? (
                            <>
                                <h4>please log in</h4>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color=".bg-success" block>Login</Button></Link>
                            </>
                        ) : (
                                <img id="loadingIcon" src="./assets/images/loading.gif" alt="loading" />
                            )}
                    </div>
                )}
        </div>
        )
    }
}

export default Payment;

