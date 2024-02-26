import React, { useState, useEffect } from 'react';
import DriverForm from '../components/DriverForm';
import { Driver, Vehicle } from '../types/types';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png'

const DriverPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingDriverId, setEditingDriverId] = useState<number | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const storedDrivers = JSON.parse(localStorage.getItem('drivers') || '[]') as Driver[];
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]') as Vehicle[];
    setDrivers(storedDrivers);
    setVehicles(storedVehicles);
  }, []);

  const handleAddDriver = (driver: Driver) => {
    const updatedDrivers = [...drivers, driver];
    setDrivers(updatedDrivers);
    localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
  };

  const handleEditDriver = (id: number) => {
    const driverToEdit = drivers.find((driver) => driver.id === id);
    if (driverToEdit) {
      setEditingDriverId(id);
      setEditingDriver(driverToEdit);
    }
  };

  const handleUpdateDriver = (updatedDriver: Driver) => {
    const updatedDrivers = drivers.map((driver) => (driver.id === updatedDriver.id ? updatedDriver : driver));
    setDrivers(updatedDrivers);
    localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
    setEditingDriverId(null);
    setEditingDriver(null);
  };

  const handleDeleteDriver = (id: number) => {
    const updatedDrivers = drivers.filter((driver) => driver.id !== id);
    setDrivers(updatedDrivers);
    localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
    // Se o motorista em edição foi excluído, limpe os estados de edição
    if (editingDriverId === id) {
      setEditingDriverId(null);
      setEditingDriver(null);
    }
  };

  return (
    <div className='container-form'>   
      <div className='header-form'>
        <img src={Logo} alt="logo gobrax" title='Logo Gobrax' />
      </div>    
       
      <h1 className='title-driver-form'>Cadastro de Motorista</h1>
      <DriverForm
        onAddDriver={handleAddDriver}
        vehicles={vehicles}
        editingDriver={editingDriver}
        onUpdateDriver={handleUpdateDriver}
      />
      <h2>Motoristas Cadastrados</h2>
      {drivers.length === 0 ? (
        <p>Nenhum motorista cadastrado.</p>
      ) : (
        <ul className="drivers-list"> 
        {drivers.map((driver) => (
          <li key={driver.id} className="driver-item"> 
            <p className="driver-info"><strong>Nome:</strong> {driver.name}</p>
            <p className="driver-info"><strong>Documento:</strong> {driver.document}</p>
            <p className="driver-info">
              <strong>Veículo:</strong> {driver.vehicleId ? (
                // Verifica se o motorista tem um veículo vinculado
                // Busca o veículo correspondente pelo vehicleId
                <ul>
                  <li>
                    <strong>Marca:</strong> {vehicles.find(vehicle => vehicle.id === driver.vehicleId)?.brand}
                  </li>
                  <li>
                    <strong>Modelo:</strong> {vehicles.find(vehicle => vehicle.id === driver.vehicleId)?.model}
                  </li>
                  <li>
                    <strong>Placa:</strong> {vehicles.find(vehicle => vehicle.id === driver.vehicleId)?.plate}
                  </li>
                </ul>
              ) : (
                'Sem veículo'
              )}
            </p>
            <div className="driver-actions"> 
              <button onClick={() => handleEditDriver(driver.id)} className='button-editar'>Editar</button>
              <button onClick={() => handleDeleteDriver(driver.id)} className='button-excluir'>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
      )}
      
        <Link to="/" className='button-home-page' >Voltar</Link>
      
      
    </div>
  );
};

export default DriverPage;
