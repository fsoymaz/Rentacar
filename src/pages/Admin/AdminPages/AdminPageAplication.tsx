import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';

type Props = {
  service: any;
  Table: any;
  AddData: any;
  UpdateData: any;
}

const AdminPageApplication: React.FC<Props> = ({ service, Table, AddData, UpdateData }: Props) => {
  const [data, setData] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [isAddingData, setIsAddingData] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [isAddingData, service]);

  const fetchData = async () => {
    try {
      const fetchedData = await service.getAll();
      setData(fetchedData.data as any);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = async (data: any) => {
    try {
      setIsAddingData(true);
      setShowModal(false);
      await fetchData(); 
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdate = (item: any) => {
    setSelectedItem(item);
    setIsAddingData(false); 
    setShowModal(true); 
  };
  
  const handleDelete = async () => {
    if (true) {
      try {
        await service.delete(122);
        await fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    } else {
      console.error('No item selected or item does not have an id.');
    }
  };

  return (
    <div className='container px-5' >
      <Row className='button-group'>
        <Col xs={12} sm={4}>
          <Button variant='primary' className='w-100' onClick={() => { setIsAddingData(true); setShowModal(true); }}>
            Add
          </Button>
        </Col>
        <Col xs={12} sm={4}>
          <Button variant='warning' className='w-100' onClick={handleUpdate}>
            Update
          </Button>
        </Col>
        <Col xs={12} sm={4}>
          <Button variant='danger' className='w-100' onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
      <div className='table-container' style={{ backgroundColor: 'white' }}>
        <Table cars={data} />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='mb-2'>{isAddingData ? 'Add' : 'Update'} Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isAddingData ? <AddData onSubmit={handleAdd} /> : <UpdateData item={selectedItem} onSubmit={handleUpdate} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={isAddingData ? handleAdd : handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPageApplication;
