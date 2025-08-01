import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faSignInAlt, 
  faEye, 
  faEyeSlash,
  faCar,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import authService from "../../service/authService/AuthService";
import { loginSuccess } from "../../store/user/userSlice";
import { setToken } from "../../utils/Interceptors";
import { addLogin } from "../../models/auth/addLogin";
import "./login.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<addLogin>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!credentials.email) {
      newErrors.email = "Email adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Geçerli bir email adresi giriniz";
    }
    
    if (!credentials.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(credentials);
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const decodedToken: JwtPayload = jwtDecode(accessToken);
        dispatch(loginSuccess(decodedToken));
        setToken(accessToken);

        toast.success("Başarıyla giriş yapıldı!");

        const naviToken = localStorage.getItem("navi");
        if (naviToken) {
          localStorage.removeItem("navi");
          navigate(naviToken);
        } else {
          navigate("/");
        }
      } else {
        toast.error("Kullanıcı adı veya şifre yanlış");
      }
    } catch (error: any) {
      console.error("Login işlemi başarısız:", error);
      if (error.response?.status === 401) {
        toast.error("Email veya şifre hatalı");
      } else {
        toast.error("Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 g-0">
          {/* Left Side - Branding */}
          <Col lg={6} className="login-brand-section d-none d-lg-flex">
            <div className="brand-content">
              <div className="brand-logo">
                <div className="logo-icon">
                  <FontAwesomeIcon icon={faCar} />
                </div>
                <h1 className="brand-title">RentACar</h1>
              </div>
              <h2 className="brand-headline">
                Hayalinizdeki yolculuk bir tık uzağınızda
              </h2>
              <p className="brand-description">
                Premium araç kiralama deneyimi için güvenli platformumuza giriş yapın. 
                Binlerce araç seçeneği arasından size en uygun olanı bulun.
              </p>
              <div className="brand-features">
                <div className="feature-item">
                  ✓ 500+ Premium araç
                </div>
                <div className="feature-item">
                  ✓ 7/24 Müşteri desteği
                </div>
                <div className="feature-item">
                  ✓ Güvenli ödeme sistemi
                </div>
                <div className="feature-item">
                  ✓ Türkiye geneli hizmet
                </div>
              </div>
            </div>
            <div className="brand-background"></div>
          </Col>

          {/* Right Side - Login Form */}
          <Col lg={6} className="login-form-section">
            <div className="form-container">
              <div className="form-header">
                <Button 
                  variant="link" 
                  className="back-button d-lg-none"
                  onClick={() => navigate('/')}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Ana Sayfa
                </Button>
                
                <div className="mobile-brand d-lg-none">
                  <div className="mobile-logo">
                    <FontAwesomeIcon icon={faCar} />
                  </div>
                  <h2>RentACar</h2>
                </div>

                <h3 className="form-title">Hoş Geldiniz</h3>
                <p className="form-subtitle">
                  Hesabınıza giriş yapın ve araç kiralama deneyiminize başlayın
                </p>
              </div>

              <Card className="login-card">
                <Card.Body>
                  <Form onSubmit={handleSubmit} className="login-form">
                    {/* Email Field */}
                    <div className="form-group">
                      <Form.Label className="form-label">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Email Adresi
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={`form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="ornek@email.com"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                      <Form.Label className="form-label">
                        <FontAwesomeIcon icon={faLock} className="me-2" />
                        Şifre
                      </Form.Label>
                      <div className="password-input-container">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          className={`form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                          placeholder="Şifrenizi giriniz"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                      </div>
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="form-actions-top">
                      <Button
                        variant="link"
                        className="forgot-password-link"
                        onClick={handleForgotPasswordClick}
                      >
                        Şifremi Unuttum
                      </Button>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="login-submit-btn"
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Giriş Yapılıyor...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                          Giriş Yap
                        </>
                      )}
                    </Button>
                  </Form>

                  {/* Register Link */}
                  <div className="register-section">
                    <p className="register-text">
                      Hesabınız yok mu?{" "}
                      <Link to="/register" className="register-link">
                        Hemen kayıt olun
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
