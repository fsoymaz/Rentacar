import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Admin = () => {
  const vehicleCount = 50;
  const userCount = 100;

  const data = [
    { name: 'Pzt', uv: 30 },
    { name: 'Sal', uv: 40 },
    { name: 'Çar', uv: 35 },
    { name: 'Per', uv: 50 },
    { name: 'Cum', uv: 45 },
    { name: 'Cmt', uv: 55 },
    { name: 'Paz', uv: 60 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='container p-5'>
      <Row>
        <Col lg={1} md={3}>
         
        </Col>
        <Col lg={10} md={9}>
          {/* Ana içerik */}
          <Row>
            <Col lg={6} md={6}sm={6}>
              <Card className='mx-5 px-5'>
                <Card.Body>
                  <Card.Title>Kullanıcı Sayısı</Card.Title>
                  <PieChart width={100} height={100}>
                    <Pie
                      data={[{ name: 'Kullanıcılar', value: userCount }]}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      outerRadius={50}
                      fill='#8884d8'
                      label
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} md={6}>
              <Card className='mb-3'>
                <Card.Body>
                  <Card.Title>Araç Sayısı</Card.Title>
                  <Card.Text>{vehicleCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12}>
              <Card className='mt-5'>
                  <Card.Title>Haftalık Kiralama İşlemleri</Card.Title>
                  <BarChart
                    width={450}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='uv' fill='#8884d8' />
                  </BarChart>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;