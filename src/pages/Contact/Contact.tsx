import React from "react";
import './Contact.css'

const ContactUs = () => {
  localStorage.setItem("navi", "/contact");
  return (
    <div>
      <div className="contact-info">
        <table>
          <tbody>
            <tr>
              <td className="right-cell">
                <h5 className="header-5">Genel Müdürlük</h5>
                <p className="address">
                  FFY Ulaşım Çözümleri A.Ş. <br />
                  FFY Fatih Sultan Mehmet E Blok Ümraniye 34770 İSTANBUL <br />
                  T: (0 216) 000 00 00 <br />
                  F: (0 216) 000 00 02 <br />
                  E-Posta: info@ffy.com.tr
                </p>
              </td>
              <td className="left-cell">
                <h5 className="header-5">Rezervasyon Merkezi</h5>
                <p className="para">
                  Size özel fiyatlandırma ve çözümler ile zengin marka ve en yeni
                  model araç kiralama teklifleri için <strong> 08:00 - 00:00 </strong> arası, tüm
                  Türkiye’de hizmet veren 444 X XXX numaralı ‘Rezervasyon Merkezi’
                  hattımızı arayabilir veya 444xxxx@ffy.com.tr adresimize
                  e-posta gönderebilirsiniz.
                </p>
                <h5 className="header-5">7/24 Acil Yardım Hattı</h5>
                <p className="para">
                  Aracınızla bir kaza geçirmeniz, aracın çalınması, arızalanması,
                  lastik patlaması ve her türlü acil yardıma ihtiyaç duyduğunuz
                  durumda, 7 gün 24 saat, tüm Türkiye’de hizmet veren 0850 000 00 00
                  numaralı ‘Acil Yardım’ hattımızı arayabilirsiniz.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="header"><h3>Müşteri Hizmetleri</h3>
        <p className="big-phone"> 444 X XXX</p></div>
    </div>
  );
};

export default ContactUs;
