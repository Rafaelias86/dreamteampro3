import React from "react";
import "./Footer.scss";

function Footer() {
    return (
        <footer>
          <div className="footer fixed-bottom bg-dark text-white text-center d-flex justify-content-around">
            <button onClick={() => window.location='/profile'} type="button" class="btn btn-outline-primary mx-1"><i class="fas fa-car mx-2"></i>Add/View</button>
            <button onClick={() => window.location='#'}type="button" class="btn btn-outline-light mx-1"><i class="fas fa-qrcode mx-2"></i>Scan</button>
            <button onClick={() => window.location='#'}type="button" class="btn btn-outline-info mx-1"><i class="fas fa-search mx-2"></i>Retrieve</button>
            <button onClick={() => window.location='#'}type="button" class="btn btn-outline-success mx-1"><i class="fas fa-dollar-sign mx-2"></i>Pay</button>
            <button onClick={() => window.location='#'}type="button" class="btn btn-outline-warning mx-1"><i class="fas fa-parking mx-2"></i>Space</button>
           
            {/* <p className="navbar-text my-2 my-lg-0">
                Copyright  © EZ Valpark Inc. 2019
            </p>      */}
        </div>
        </footer>
    )
}
export default Footer;