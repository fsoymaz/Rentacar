# RentACar - Araç Kiralama Sistemi

Modern ve kullanıcı dostu bir araç kiralama web uygulaması. Spring Boot backend ve React frontend ile geliştirilmiştir.

## 🚀 Özellikler

- **Kullanıcı Yönetimi**: Kayıt, giriş ve profil yönetimi
- **Araç Yönetimi**: Araç ekleme, düzenleme ve listeleme
- **Kiralama Sistemi**: Tarih bazlı araç kiralama ve müsaitlik kontrolü
- **Admin Paneli**: Sistem yönetimi ve istatistikler
- **Ödeme Sistemi**: Kredi kartı ile ödeme işlemleri
- **Responsive Tasarım**: Tüm cihazlarda uyumlu arayüz

## 🛠️ Teknolojiler

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Security** - Güvenlik ve JWT token yönetimi
- **Spring Data JPA** - Veritabanı işlemleri
- **PostgreSQL** - Veritabanı
- **Maven** - Bağımlılık yönetimi
- **Lombok** - Code generation
- **ModelMapper** - Object mapping

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Bootstrap** - UI components
- **Formik & Yup** - Form validation
- **Axios** - HTTP client

## 🐳 Docker ile Kurulum

### Gereksinimler
- Docker ve Docker Compose
- Git

### Hızlı Başlangıç

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd rentacar
```

2. **Production ortamını başlatın:**
```bash
make up
# veya
docker-compose up -d
```

3. **Uygulamalara erişin:**
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Database: localhost:5432

### Development Ortamı

```bash
# Development ortamını başlat
make dev-up

# Logları görüntüle
make logs

# Development ortamını durdur
make dev-down
```

### Makefile Komutları

```bash
make help        # Tüm komutları listele
make build       # Docker image'larını build et
make up          # Production ortamını başlat
make down        # Production ortamını durdur
make logs        # Logları görüntüle
make clean       # Tüm Docker kaynaklarını temizle
make restart     # Servisleri yeniden başlat
make health      # Servis durumlarını kontrol et
```

## 📋 Manuel Kurulum

### Backend

1. **Gereksinimler:**
   - Java 17
   - Maven 3.6+
   - PostgreSQL 12+

2. **Veritabanı kurulumu:**
```sql
CREATE DATABASE rentacar_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE rentacar_db TO postgres;
```

3. **Environment variables:**
```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/rentacar_db
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your_password
export SPRING_SECURITY_JWT_KEY=your_jwt_secret_key
```

4. **Uygulamayı başlatın:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

1. **Gereksinimler:**
   - Node.js 18+
   - npm veya yarn

2. **Bağımlılıkları yükleyin:**
```bash
cd frontend
npm install
```

3. **Environment variables:**
```bash
export REACT_APP_API_BASE_URL=http://localhost:8080
export REACT_APP_API_URL=http://localhost:8080/api
```

4. **Development server'ı başlatın:**
```bash
npm start
```

## 🔧 Configuration

### Environment Variables

Backend için gerekli environment variable'lar:
- `SPRING_DATASOURCE_URL`: PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME`: Database username
- `SPRING_DATASOURCE_PASSWORD`: Database password
- `SPRING_SECURITY_JWT_KEY`: JWT secret key
- `SPRING_MAIL_USERNAME`: Gmail username (optional)
- `SPRING_MAIL_PASSWORD`: Gmail app password (optional)

Frontend için gerekli environment variable'lar:
- `REACT_APP_API_BASE_URL`: Backend base URL
- `REACT_APP_API_URL`: Backend API URL

## 📚 API Dokümantasyonu

Uygulama çalıştıktan sonra Swagger UI'a erişebilirsiniz:
- http://localhost:8080/swagger-ui.html

## 🧪 Testing

```bash
# Backend testleri
cd backend
mvn test

# Frontend testleri
cd frontend
npm test
```

## 🚀 Production Deployment

1. **Environment variables'ları ayarlayın**
2. **Production profili ile başlatın:**
```bash
make prod-up
```

3. **SSL sertifikası ekleyin (nginx reverse proxy ile)**

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz. 