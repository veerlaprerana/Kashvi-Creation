
import React from 'react';
import './Contact.css';
import Swal from 'sweetalert2';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';


function Navbar() {
    return (
      <nav className="navbar">
        <h1 className="logo">Welcome to Kashvi Creation</h1>
      </nav>
    );
  }
  
  function NavLinks() {
    // const navigate = useNavigate();
    return (
      <div className="nav-links-wrapper">
        {/* <div classname =""></div> */}
        <div className="logo-container">
        <img src="/IMG-20250204-WA0006l.jpg" alt="Kashvi Logo" className="kashvi-logo" />
        </div>
        
      </div>
    );
  }


/* RED marker icon from Leaflet-color-markers */
const customIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [20, 32],       // Reduced size (same as before)
  iconAnchor: [10, 32],
  popupAnchor: [1, -30],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [32, 32],
});

const position = [21.18172, 72.84604];
const position2 = [21.18308, 72.83959];

const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "cb2c72b5-ba6d-4e4e-bc77-d56f07eb38d5");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            Swal.fire({
                title: 'Success!',
                text: 'Message sent successfully',
                icon: 'success'
            }).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <>
        {/* <Navbar></Navbar> */}
        {/* <NavLinks></NavLinks> */}
        {/* <Header></Header> */}
        <section className="contact-container">
            <div className="contact-form">
                <form onSubmit={onSubmit}>
                    <h2>Contact Form</h2>
                    <div className="input-box">
                        <label>Full Name</label>
                        <input type="text" className="field" placeholder="Enter your name" name="name" required />
                    </div>
                    <div className="input-box">
                        <label>Email Address</label>
                        <input type="email" className="field" placeholder="Enter your email" name="email" required />
                    </div>
                    <div className="input-box">
                        <label>Your Message</label>
                        <textarea name="message" className="field mess" placeholder="Enter your message" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>

            {/* Right-Side Section */}
            <div className="right-section">
                {/* Contact Info */}
                <div className="us">
                    <h2>Contact Us</h2>
                    <div className="contact-box">
                        {/* Phone */}
                        <div className="contact-item">
                            <a href="#" className="contact-link">
                                <span>Vimal Jain </span>
                                <span> &#x1F4DE; +917290909696</span><br/><br/>
                                <span>Manoj Kejriwal </span>
                                <span> &#x1F4DE; +919376421333</span>
                            </a>
                        </div>

                        {/* Email */}
                        <div className="contact-item">
                            <a href="mailto:kashvi_trial@gmail.com" className="contact-link">
                                <span>&#x2709; kashvicreation10@gmail.com.</span>
                            </a>
                        </div>

                        {/* Instagram */}
                        <div className="contact-item">
                            <a href="https://www.instagram.com/_kashvicreation?igsh=cGQ5MWE2Z3FuZWJi" 
                                target="_blank"
                                rel="noopener noreferrer">
                                <span>&#x1F4F7; _kashvivreation</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Account Details Section */}
                <div className="account-details">
                    <h2>ACCOUNT DETAILS</h2>
                    <br/>
                    <>
                        <a href="#">Track your last order</a>
                        <p><a href="#">View your orders</a></p> 
                        <p><a href="#">Manage your addresses</a></p>
                    </>
                    <br/>
                    <p>
                        <a href="#">Sign in</a>
                    </p>
                    <p>
                        <a href="#">Create an account</a>
                    </p>
                </div>
            </div>

            {/* Map Section */}
            <div className="map-container">
                <div className="map-info">
                    <h2>📍 Reach out to us at</h2>
                    <p>
                        <strong>Sales Office:</strong><br/>
                        Shop No. 113,<br/>
                        Millennium Textile Market - 2,<br/>
                        Ring Road, <br/>
                        Surat, Gujarat - 395002
                    </p>
                    <br/>
                    <p>
                        <strong>Head Office:</strong><br/>
                        Shop No. 6115 to 6124,<br/>
                        Millennium Textile Market - 4,<br/>
                        Bhathena,<br/>
                        Surat, Gujarat - 395002<br/>
                    </p>
                </div>
                <div className="map">
                    <MapContainer center={position} zoom={15} className="map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={position} icon={customIcon}>
                            <Popup>📍 Kashvi Creation</Popup>
                        </Marker>
                        <Marker position={position2} icon={customIcon}>
                            <Popup>📍 Shree Devangna Sarees</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </section>
        {/* <Footer></Footer> */}
        </>
    );
};

export default Contact;

