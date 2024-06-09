import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-section bg-dark mt-5" style={{ background: '#222', color: '#fff' }}>
            <div className="container">
                <div className="footer-cta pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-map-marker-alt"></i>
                                <div className="cta-text">
                                    <h4 style={{ color: '#fff' }}>Find us</h4>
                                    <span>1010 Avenue, sw 54321, chandigarh</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="fas fa-phone"></i>
                                <div className="cta-text">
                                    <h4 style={{ color: '#fff' }}>Call us</h4>
                                    <span>9876543210 0</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-30">
                            <div className="single-cta">
                                <i className="far fa-envelope-open"></i>
                                <div className="cta-text">
                                    <h4 style={{ color: '#fff' }}>Mail us</h4>
                                    <span>mail@info.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-5 pb-5">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <span style={{ fontSize: '2.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>Rent</span>
                                    <span style={{ color: 'red', fontSize: '2.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>A</span>
                                    <span style={{ fontSize: '2.5rem', fontWeight: '800', userSelect: 'none', cursor: 'pointer' }}>Car</span>                                </div>
                                <div className="footer-social-icon">
                                    <span style={{ color: '#fff' }}>Follow us</span>
                                    <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                    <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                    <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-50">
                            <div className="footer-widget">
                                <div className="footer-widget-heading">
                                    <h3 style={{ color: '#fff' }}>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p>Yeni yayınlarımıza abone olmayı unutmayın, lütfen aşağıdaki formu doldurun.</p>
                                </div>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="text" placeholder="Email Address" />
                                        <button><i className="fab fa-telegram-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 text-center text-lg-left mb-4 mb-lg-0">
                            <div className="copyright-text">
                                <p style={{ color: '#fff' }}>Copyright &copy; 2018, All Right Reserved <a href="https://codepen.io/anupkumar92/" style={{ color: '#fff' }}>Anup</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
