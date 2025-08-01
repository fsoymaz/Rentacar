import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar, 
  faShieldAlt, 
  faHeadset, 
  faStar,
  faUsers,
  faRoad,
  faMapMarkerAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import RentACarForm from '../../components/RentacarForm/RentacarForm';
import Campaign from '../../components/Campaign/Campaign';
import './Homepage.scss';

const Homepage: React.FC = () => {
  localStorage.setItem("navi", "/");

  const features = [
    {
      icon: faCar,
      title: "Premium Araç Filosu",
      description: "Son model ve bakımlı araçlarımızla konforlu yolculuk yapın"
    },
    {
      icon: faShieldAlt,
      title: "Güvenli & Güvenilir",
      description: "Tam kapsamlı sigorta ve 7/24 yol yardımı hizmeti"
    },
    {
      icon: faHeadset,
      title: "7/24 Müşteri Desteği",
      description: "Her zaman yanınızdayız, sorunlarınız için bizi arayın"
    },
    {
      icon: faMapMarkerAlt,
      title: "Türkiye Geneli Hizmet",
      description: "50+ şehirde araç teslim alma ve iade imkanı"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Mutlu Müşteri" },
    { value: "500+", label: "Araç Filosu" },
    { value: "50+", label: "Şehir" },
    { value: "5 Yıl", label: "Tecrübe" }
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      comment: "Harika bir hizmet! Araç temiz ve konforluydu. Kesinlikle tekrar tercih edeceğim.",
      rating: 5,
      location: "İstanbul"
    },
    {
      name: "Ayşe Demir",
      comment: "Müşteri hizmetleri çok ilgili ve profesyonel. Sorunsuz bir kiralama deneyimi yaşadım.",
      rating: 5,
      location: "Ankara"
    },
    {
      name: "Mehmet Öz",
      comment: "Uygun fiyat ve kaliteli araçlar. İş seyahatlerim için vazgeçilmez oldu.",
      rating: 5,
      location: "İzmir"
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6} className="hero-content">
                <div className="hero-badge">
                  <FontAwesomeIcon icon={faStar} className="me-2" />
                  Türkiye'nin #1 Araç Kiralama Platformu
                </div>
                <h1 className="hero-title">
                  Hayalinizdeki Yolculuk
                  <span className="text-primary"> Bir Tık Uzağınızda</span>
                </h1>
                <p className="hero-description">
                  Premium araç filoumuz ve profesyonel hizmet anlayışımızla 
                  her yolculuğunuzu özel kılıyoruz. Güvenli, konforlu ve 
                  uygun fiyatlı araç kiralama deneyimi yaşayın.
                </p>
                <div className="hero-buttons">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="me-3 hero-btn-primary"
                    href="#rental-form"
                  >
                    Hemen Kirala
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    className="hero-btn-secondary"
                    href="#features"
                  >
                    Daha Fazla Bilgi
                  </Button>
                </div>
                
                {/* Stats */}
                <Row className="hero-stats mt-5">
                  {stats.map((stat, index) => (
                    <Col key={index} xs={6} sm={3}>
                      <div className="stat-item">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col lg={6} className="hero-image">
                <div className="floating-card">
                  <img 
                    src="http://res.cloudinary.com/dq6lsgssu/image/upload/v1710254237/55e319a1-fcc9-4f9a-96b0-0953c7232607.png" 
                    alt="Premium Araç" 
                    className="img-fluid"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Rental Form Section */}
      <section id="rental-form" className="rental-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="section-header text-center">
                <h2>Araç Kiralama</h2>
                <p>Kolayca araç kiralayın, keyifli yolculuklar yapın</p>
              </div>
              <div className="rental-form-card">
                <RentACarForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <Container>
          <Row className="section-header text-center">
            <Col>
              <h2>Neden Bizi Tercih Etmelisiniz?</h2>
              <p>Size en iyi araç kiralama deneyimini sunmak için çalışıyoruz</p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="feature-card h-100">
                  <Card.Body className="text-center">
                    <div className="feature-icon">
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <Card.Title className="feature-title">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="feature-description">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Campaign Section */}
      <Campaign />

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <Row className="section-header text-center">
            <Col>
              <h2>Müşterilerimiz Ne Diyor?</h2>
              <p>Binlerce memnun müşterimizin deneyimlerini keşfedin</p>
            </Col>
          </Row>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col key={index} lg={4}>
                <Card className="testimonial-card h-100">
                  <Card.Body>
                    <div className="testimonial-rating mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className="star-filled" />
                      ))}
                    </div>
                    <Card.Text className="testimonial-comment">
                      "{testimonial.comment}"
                    </Card.Text>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <small className="text-muted d-block">{testimonial.location}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h2>Hemen Araç Kiralamaya Başlayın</h2>
              <p>Binlerce araç seçeneği arasından size en uygun olanı bulun</p>
              <Button 
                variant="primary" 
                size="lg" 
                className="cta-button"
                href="#rental-form"
              >
                Şimdi Kirala
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
