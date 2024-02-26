import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Driver, Vehicle } from '../types/types';
import { Slide, toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Style.css';

interface Props {
  onAddDriver: (driver: Driver) => void; 
  onUpdateDriver: (driver: Driver) => void; 
  editingDriver: Driver | null; 
  vehicles: Vehicle[]; 
}

const DriverForm: React.FC<Props> = ({ onAddDriver, onUpdateDriver, editingDriver, vehicles }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);

  // Efeito para inicializar o formulário quando um motorista é selecionado para edição ou quando a lista de veículos é atualizada.
  useEffect(() => {
    if (editingDriver) {
      setName(editingDriver.name); // Define o nome do motorista para edição.
      setDocument(editingDriver.document); // Define o documento do motorista para edição.
      setSelectedVehicleId(editingDriver.vehicleId); // Define o veículo selecionado para o motorista.
    }
    // Filtra os veículos disponíveis para evitar a duplicidade de vinculação, exceto para o próprio veículo do motorista em edição.
    setAvailableVehicles(vehicles.filter(vehicle => !editingDriver || vehicle.id === editingDriver.vehicleId));
  }, [editingDriver, vehicles]);

  // Função para lidar com a submissão do formulário.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão de submissão de formulários.
    const newDriver: Driver = {
      id: editingDriver ? editingDriver.id : Date.now(), // Define um ID baseado na edição ou criação de um novo motorista.
      name,
      document,
      vehicleId: selectedVehicleId,
    };
    // Verifica se está editando ou adicionando um novo motorista para chamar a função correspondente.
    if (editingDriver) {
      onUpdateDriver(newDriver);
    } else {
      onAddDriver(newDriver);
    }
    // Reseta o formulário após a submissão.
    setName('');
    setDocument('');
    setSelectedVehicleId(null);
  };

  const formatCPF = (value: string): string => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos, novamente, para o segundo bloco de números
      .replace(/(\d{3})(\d)/, '$1-$2') // Coloca um traço entre o terceiro e o quarto dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Limita a máscara para aceitar até 11 caracteres, sendo os dois últimos após o traço
  };
  
  
  // Renderização do formulário para adicionar ou editar motoristas.
  return (
    <form onSubmit={handleSubmit} className="driver-form">
  <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
  <input
    type="text"
    placeholder="Documento"
    value={document}
    onChange={(e) => setDocument(formatCPF(e.target.value))}
    className="input-field"
  />
  <select
    value={selectedVehicleId || ''}
    onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
    className="select-field"
  >
    <option value="">Selecione um veículo</option>
    {availableVehicles.map((vehicle) => (
      <option key={vehicle.id} value={vehicle.id}>
        {vehicle.brand} - {vehicle.model} - {vehicle.plate}
      </option>
    ))}
  </select>
  <button type="submit" className="submit-button">
    {editingDriver ? 'Atualizar Motorista' : 'Adicionar Motorista'}
  </button>
</form>
  );
};

export default DriverForm;

