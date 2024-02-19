import React from 'react'
import { useLocation } from 'react-router-dom';

type Props = {}

const Success = (props: Props) => {
  const location = useLocation();
  const { info} = location.state || {};


  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR'); // Türkçe tarih formatı: gün.ay.yıl
  };

  return (
    <div>{info?.plate}<br/>
    {info?.firstName}<br/>
    {info?.lastName}<br/>
    {info?.invoiceNo}<br/>
    {info?.totalPrice}<br/>
    {info?.taxRate}<br/>
    {formatDateString(info?.startDate)}<br/>
    {formatDateString(info?.endDate)}<br/>
    {info?.plate}<br/>
    {info?.email}<br/>
    </div>
  )
}

export default Success