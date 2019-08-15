import React, { Component } from "react";
import logo from "./cards.png";
import "./Payment.scss";
require('dotenv').config();

class Payment extends Component {
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
  render() {
    var buttonText = this.state.isLoading ? "Please wait ..." : "Pay $10";
    var buttonClassName =
      "Pay-Now" + (this.state.isLoading ? " Pay-Now-Disabled" : "");
    if (this.state.stripeToken) {
      buttonText = "✅ Payment Successful";
      buttonClassName = "Pay-Now Pay-Now-Disabled";
      //window.location='/profile';
    }
    return (
      <div className="Scan">
        <div className="Scan-header">
          <h2>Payment Option</h2>
          <img src={logo} className="Scan-logo" alt="logo" />         
        </div>
        {/* <p className="Scan-intro">
          {
            "Tap the button below to open Stripe's Checkout overlay. Replace <YOUR_STRIPE_PUBLISHABLE_KEY> in Scan.js with your own key."
          }
        </p> */}
        {/* {this.state.stripeToken ? (
          <p className="Scan-intro">
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
    );
  }
}

export default Payment;
