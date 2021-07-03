import React ,{useState} from 'react';
import img1 from './img/scroll/mountain1.png';
import img2 from './img/scroll/mountain2.png';
import img3 from './img/scroll/bg.jpg';
import img4 from './img/scroll/text.png';
import img5 from './img/scroll/airplane.png';
import "./homePage.css";
import NavbarUser from "./NavbarUser";
import Footer from "./Footer";




export default function HomePageUserScreen(){
    const[offset, setOffset] = useState();

    const handleScroll = ()=> setOffset(window.pageYOffset);
    window.addEventListener('scroll',handleScroll);
        const cardStyle = 
        {"--i":"-1"};
        const cardStyle2 = 
        {"--i":"0"};
        const cardStyle3 = 
        {"--i":"1"};
        const contStyle = 
        {"--j":"1"};
        const contStyle2 = 
        {"--j":"2"};
        const contStyle3 = 
        {"--j":"3"};
    return(
        <div>
        <NavbarUser/>
        <main>
            <div className="Appp">
                <div  className="zoom">
                    <img src={img5} alt="" id="img5"style={{transform: 'translate('+offset+'%, '+offset+'%)'}}/>
                    <img src={img1} alt="" id="img1" style={{width:(100+offset*0.3) + '%'}}/>
                    <img src={img2} alt="" id="img2"style={{width:(100+offset*0.3) + '%'}}/>
                    <img src={img4} alt="" id="img4" style={{top:`-${10 + offset * 0.3 + '%'}`}}/>
                </div>
                <div  className="content">
                        <h1  >
                            Nomadic, welcome to the journey
                        </h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                </div>
                <div  className="content1">
                    <div  className="containerContent1">
                        <div  className="cardC" style={cardStyle}>
                            <div  className="cardContent" style={contStyle}>
                                <h2>Our Services</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                        <div  className="cardC" style={cardStyle2}>
                        <div  className="cardContent" style={contStyle2}>
                                <h2>Our Community</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                        <div  className="cardC" style={cardStyle3}>
                        <div  className="cardContent" style={contStyle3}>
                                <h2>Our Organized trips</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/> 

        </main>
        </div>
    );
}