import React, { useState, useEffect } from 'react';
import VehicleForm from '../components/VehicleForm';
import { Vehicle } from '../types/types';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png'

const VehiclePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicleId, setEditingVehicleId] = useState<number | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]') as Vehicle[];
    setVehicles(storedVehicles);
  }, []);

  const handleAddVehicle = (vehicle: Vehicle) => {
    const updatedVehicles = [...vehicles, vehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
  };

  const handleEditVehicle = (id: number) => {
    const vehicleToEdit = vehicles.find((vehicle) => vehicle.id === id);
    if (vehicleToEdit) {
      setEditingVehicleId(id);
      setEditingVehicle(vehicleToEdit);
    }
  };

  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    const updatedVehicles = vehicles.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle));
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    setEditingVehicleId(null);
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (id: number) => {
    const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
    // Se o veículo em edição foi excluído, limpe os estados de edição
    if (editingVehicleId === id) {
      setEditingVehicleId(null);
      setEditingVehicle(null);
    }
  };

  return (
    <div className='container-form '> 
      <div className='header-form'>
        <img src={Logo} alt="logo gobrax" title='Logo Gobrax' />
      </div>   
  <h1 className='title-driver-form'>Cadastro de Veículo</h1> 
  <VehicleForm
    onAddVehicle={handleAddVehicle}
    editingVehicle={editingVehicle}
    onUpdateVehicle={handleUpdateVehicle}
    onDeleteVehicle={() => {}} 
    vehicles={[]} 
  />
  <h2>Veículos Cadastrados</h2>
  {vehicles.length === 0 ? ( 
    <p>Nenhum veículo cadastrado.</p>
  ) : (
    <ul className="drivers-list">
      {vehicles.map((vehicle) => (
        <li key={vehicle.id} className="driver-item">
          <p className="driver-info"><strong>Marca:</strong> {vehicle.brand}</p>
          <p className="driver-info"><strong>Modelo:</strong> {vehicle.model}</p>
          <p className="driver-info"><strong>Placa:</strong> {vehicle.plate}</p>
          <div className="driver-actions"> 
            <button onClick={() => handleEditVehicle(vehicle.id)} className='button-editar'>Editar</button> 
            <button onClick={() => handleDeleteVehicle(vehicle.id)} className='button-excluir'>Excluir</button> 
          </div>
        </li>
      ))}
    </ul>
  )}
  <Link to="/" className='button-home-page'>Voltar</Link>
</div>

  );
};

export default VehiclePage;
