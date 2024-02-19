import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

type Props = {
  service: any;
  Table: any;
  AddData: any;
  UpdateData: any;
}

const AdminPageAplication: React.FC<Props> = ({ service, Table, AddData, UpdateData }: Props) => {
  const [data, setData] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [isAddingData, setIsAddingData] = useState(true);

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
      // handle add logic with data
      setIsAddingData(true);
      setShowModal(false);
      await fetchData(); // Call fetchData to refresh data
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdate = () => {
    setIsAddingData(false); // Güncelleme yapılacağı için isAddingData değerini false yap
    setShowModal(true); // Modal'ı göster
  };
  
  const handleDelete = () => {
    // handle delete logic
  };

  return (
    <div className='container px-5' >
      <div className='button-group'>
        <Button variant='primary' onClick={() => { setIsAddingData(true); setShowModal(true); }}>
          Add
        </Button>

        <Button variant='warning' onClick={handleUpdate}>
          Update
        </Button>

        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <div className='table-container' style={{ backgroundColor: 'white' }}>
        <table>
          <Table cars={data} />
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className='mb-2'>{isAddingData ? 'Add' : 'Update'} Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isAddingData ? <AddData onSubmit={handleAdd} /> : <UpdateData onSubmit={handleUpdate} />}
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

export default AdminPageAplication;
