/* --------------------------------------------------------------------------------------------------------------------------------------------
  Simple Contact Page.
*/
import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <div className="container contact">
        <div className="pl-3">
          <h1 className="title-primary underline-brush text-secondary">
            Ways You Can Reach out!
          </h1>
          <p id="TradeGothic">
            Please let us know if you have any questions, comments, or concerns
            on the functionality of the VPIA. We will get back to you as soon as
            we can.
          </p>
          <h2 className="heading-secondary">Contact</h2>
          <p id="TradeGothic">
            416.977.6000 x4587 <br /> vpia@ocadu.ca <br /> wapatah@ocadu.ca
            <br />
          </p>
          <p id="TradeGothic">
            For new research and employment opportunities, please visit
            <a href="https://wapatah.com/"> wapatah.com</a>
          </p>
          <h2 className="heading-secondary">Mail</h2>
          <p id="TradeGothic">
            100 McCaul St, <br />
            Toronto, ON, M5V 1V3
          </p>
          <h2 className="heading-secondary">Visit</h2>
          <p id="TradeGothic">
            Wapatah: Centre for Indigenous Visual Knowledge
            <br /> 205 Richmond St W, <br />
            Suite #311, Toronto, ON
          </p>
          <h2 className="heading-secondary">On Social</h2>
          <p id="TradeGothic">
            <ul className="list-unstyled">
              <li>
                <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
                @wapatah.ocadu
              </li>
              <li>
                <i class="fa fa-youtube" aria-hidden="true"></i> Wapatah: Centre
                for Indigenous Visual Knowledge
              </li>
              <li>
                <i class="fa fa-instagram" aria-hidden="true"></i> OCADU
                Instagram
              </li>
              <li>
                <i class="fa fa-youtube" aria-hidden="true"></i> OCADU YouTube
              </li>
              <li>
                <i class="fa fa-twitter" aria-hidden="true"></i> OCADU Twitter
              </li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
}

export default Contact;
