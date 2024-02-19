import React, { useState } from "react";
import "./About.css";
import Header from "../../components/Header/Header";

type Props = {};

const About = (props: Props) => {
  const [activeIndex1, setActiveIndex1] = useState<number | null>(null);
  const [activeIndex2, setActiveIndex2] = useState<number | null>(null);
  const [activeIndex3, setActiveIndex3] = useState<number | null>(null);
  const [activeIndex4, setActiveIndex4] = useState<number | null>(null);
  const [activeIndex5, setActiveIndex5] = useState<number | null>(null);

  const handleAccordionClick = (index: number, setActiveIndex: Function) => {
    setActiveIndex((prevIndex: number | null) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <div className="body">
      <div className="accordion">
        <div className={`context-box ${activeIndex1 === 0 ? "active" : ""}`}>
          <div className="main-label"> FFY Rentals'a Hoş Geldiniz! </div>
          <p
            className="content"
            onClick={() => handleAccordionClick(0, setActiveIndex1)}
          >
            FFY Rentals olarak, seyahat etme tutkunuzu desteklemek ve size en
            iyi araç kiralama deneyimini sunmak için buradayız. Yola
            çıktığınızda, konforunuz ve güvenliğiniz bizim için önceliktir. Biz,
            sektördeki uzun yıllar deneyim kazanmış bir ekip olarak,
            müşterilerimize kaliteli hizmet sunmayı amaçlıyoruz.
          </p>
        </div>
        <div className={`context-box ${activeIndex2 === 0 ? "active" : ""}`}>
          <div
            className="label"
            onClick={() => handleAccordionClick(0, setActiveIndex2)}
          >
            Misyonumuz
          </div>
          <p className="content">
            Misyonumuz, müşterilerimize en iyi araç kiralama deneyimini sunarak
            seyahatlerini daha keyifli ve sorunsuz hale getirmektir. FFY Rentals
            olarak, müşteri memnuniyetini ön planda tutuyor ve güvenilir,
            kaliteli araçları uygun fiyatlarla sunarak sektörde lider olmayı
            hedefliyoruz.
          </p>
        </div>
        <div className={`context-box ${activeIndex3 === 0 ? "active" : ""}`}>
          <div
            className="label"
            onClick={() => handleAccordionClick(0, setActiveIndex3)}
          >
            Neden FFY Rentals'i Seçmelisiniz?
          </div>
          <ul className="content">
            <li>
              <strong>Geniş Araç Filosu: </strong>
              <p>
                FFY Rentals olarak, ihtiyacınıza uygun geniş bir araç filosu
                sunuyoruz. Her türlü yolculuk için ideal aracı bulmanızı
                sağlıyoruz.
              </p>
            </li>
            <li>
              <strong>Rekabetçi Fiyatlar:</strong>
              <p>
                Piyasa rekabetini gözeterek uygun fiyatlar sunuyoruz. Bütçenize
                uygun seçenekleri değerlendirerek ekonomik bir şekilde araç
                kiralama imkanı sağlıyoruz.
              </p>
            </li>
            <li>
              <strong>Müşteri Odaklı Hizmet:</strong>
              <p>
                Müşterilerimizin memnuniyeti bizim için önemlidir. Profesyonel
                ve yardımsever ekibimiz, her adımda size destek olacak.
              </p>
            </li>
            <li>
              <strong>Online Rezervasyon Kolaylığı:</strong>
              <p>
                Web sitemiz üzerinden kolayca araç rezervasyonu yapabilirsiniz.
                Basit ve kullanıcı dostu rezervasyon arayüzümüzle zamanınızı
                korurken hızlıca rezervasyon yapabilirsiniz.
              </p>
            </li>
          </ul>
        </div>
        <div className={`context-box ${activeIndex4 === 0 ? "active" : ""}`}>
          <div
            className="label"
            onClick={() => handleAccordionClick(0, setActiveIndex4)}
          >
            Biz Kimiz?
          </div>
          <p className="content">
            FFY Rentals, seyahat etmeyi seven, müşteri memnuniyetine odaklanmış
            bir ekip tarafından kurulmuştur. Her bir çalışanımız, sektördeki en
            iyi hizmeti sunmak için elinden gelenin en iyisini yapmaktadır. Siz
            değerli müşterilerimizle birlikte, FFY Rentals olarak daha nice
            keyifli ve güvenli yolculuklara imza atmayı hedefliyoruz. Bize
            güvendiğiniz için teşekkür ederiz.
          </p>
        </div>
        <div className={`context-box ${activeIndex5 === 0 ? "active" : ""}`}>
          <div
            className="label"
            onClick={() => handleAccordionClick(0, setActiveIndex5)}
          >
            Ekibimiz
          </div>
          <div className="content">
            <table>
              <tbody>
                <tr>
                  <td className="align-right">
                    <h4>Fatih Soymaz</h4>
                    <p>Yönetici</p>
                  </td>
                  <td>
                    <img src="img/bearden-man.png" alt="bearded man" />
                  </td>
                  <td className="align-right">
                    <h4>Yunus Emre Cenan</h4>
                    <p>Sistem Uzmanı</p>
                  </td>
                  <td>
                    <img src="img/stylish-man.png" alt="stylish man" />
                  </td>
                  <td className="align-right">
                    <h4>Fatıma Ekşioğlu</h4>
                    <p>Çözüm Analisti</p>
                  </td>
                  <td>
                    <img src="img/hijabi-women.png" alt="hijabi women" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="slogan">FFY Rentals – Yola çıkmanın en rahat yolu!</div>
      </div>
    </div>
  );
};

export default About;
