import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './styles.css';
import { logoutRental, selectRental } from '../../store/rental/rentalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

type Props = {};

const Success = (props: Props) => {
  const location = useLocation();
  const { info } = location.state || {};
  const rental = useSelector(selectRental);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date()); // Başlangıç tarihini useState ile başlatıyoruz
  const [endDate, setEndDate] = useState(new Date()); // Bitiş tarihini useState ile başlatıyoruz

  useEffect(() => {
    return () => {
      dispatch(logoutRental());
      window.location.reload();
    };
  }, [dispatch]);

  useEffect(() => {
    // Redux store'dan alınan başlangıç ve bitiş tarihlerini set ediyoruz
    if (rental) {
      setStartDate(new Date(rental.startDate));
      setEndDate(new Date(rental.endDate));
    }
  }, [rental]);

  const startDateObj = startDate;
  const endDateObj = endDate;
  const differenceInTime = endDateObj.getTime() - startDateObj.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const totalPrice = info?.totalPrice || 0; // Eğer totalPrice undefined veya null ise 0 olarak varsayalım
  const taxPercentage = 0.18;
  const taxAmount = totalPrice * taxPercentage;

  const systemDate: string = new Date().toLocaleString();

  const pdfIndir = () => {
    const element = document.getElementById('pdf-icerik');
    if (element) {
      const opt = {
        margin: 1,
        filename: 'fatura.pdf',
        image: { type: 'jpeg', format: 'a4', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
      dispatch(logoutRental());
    } else {
      console.error('PDF oluşturmak için element bulunamadı.');
    }
  };

  return (
    <div style={{ width: '21cm', height: '29.7cm', margin: 'auto', padding: '1cm', boxSizing: 'border-box' }}>
      <div id="pdf-icerik" className="card">
        <div className="card-body">
          <div className="container mb-5 mt-3">
            <div className="container justify-content-center">
              <img src="/logo/LOGOBLU.png" alt="logo" className="mb-5 mt- col-xl-6 logo" style={{}} />

              <div className="row my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
                  <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                    <tr>
                      <th scope="col">Müşteri Adı</th>
                      <th scope="col">Email</th>
                      <th scope="col">Fatura No</th>
                      <th scope="col">Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{info?.firstName} {info?.lastName}</td>
                      <td>{info?.email}</td>
                      <td>{info?.invoiceNo}<br /></td>
                      <td>{systemDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row my-2 mx-1 justify-content-center">
                <table className="table table-striped table-borderless">
                  <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Plaka</th>
                      <th scope="col">Kiralanacak Gün</th>
                      <th scope="col">Günlük ücret</th>
                      <th scope="col">Kdv Tutarı({"%" + info?.taxRate})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>{info?.plate}<br /></td>
                      <td>{differenceInDays}</td>
                      <td>{info?.dailyPrice + "₺"}<br /></td>
                      <td>{taxAmount + "₺"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-xl-5">
                </div>
                <div className="col-xl-4">
                  <p className="text-black float-start"><span className="text-black me-4">Toplam</span><span
                    style={{ fontSize: '20px' }}>{info?.totalPrice + "₺"}</span></p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-light text-capitalize" onClick={pdfIndir}>
        <i className="far fa-file-pdf text-danger"></i> İndir
      </button>
    </div>
  );
};

export default Success;
