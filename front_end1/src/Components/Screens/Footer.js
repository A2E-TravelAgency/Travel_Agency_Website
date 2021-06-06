import React from 'react';
import "./footer.css";
import 'font-awesome/css/font-awesome.min.css';

function Footer () {
  return (
    <body>

    <footer class="footer">
         <div class="container">
             <div class="row">
                 <div class="footer-col">
                 <i class="fad fa-compass"></i>
                 </div>
                 <div class="footer-col">
                     <h4 class>Nomadic</h4>
                     <ul>
                         <li><a href="#">Terms of sales</a></li>
                         <li><a href="#">About us</a></li>

                     </ul>
                 </div>
                 <div class="footer-col">
                     <h4>payment options</h4>
                     <ul>
                         <li><a href="#"><i class="fa fa-cc-paypal fa-2x"></i></a></li>
                         <li><a href="#"><i class="fa fa-cc-visa fa-2x"></i></a></li>
                         <li><a href="#"><i class="fa fa-cc-mastercard fa-2x"></i></a></li>
                         
                     </ul>
                 </div>
                 <div class="footer-col">
                     <h4>follow us</h4>
                     <div class="social-links">
                         <a href="https://www.facebook.com"><i class="fa fa-facebook fa-2x"></i></a>
                         <a href="https://www.intagram.com"><i class="fa fa-instagram fa-2x"></i></a>
                         <a href="https://www.twitter.com"><i class="fa fa-twitter fa-2x"></i></a>
                         <a href="https://www.linkedin.com"><i class="fa fa-linkedin fa-2x"></i></a>
                     </div>
                     <div class="wrapper">
                     <ul>
                         <li>
                        <div class="button">
                            <div class="icon">
                            <i class="fa fa-envelope fa-2x"></i>
                            </div>
                            <span>serviceclient@a2e.com</span>
                        </div>
                        </li>
                        <li>
                        <div class="button">
                            <div class="icon">
                            <i class="fa fa-phone fa-2x"></i>
                            </div>
                            <span>+212 6 03 80 47 39</span>
                        </div>
                        </li>
                        </ul>
                       </div> 
                 </div>
             </div>
         </div>
    </footer>
  
  </body>
  );
};
export default Footer;