import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Vehicle } from '../types/types'; 
import { Slide, toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Style.css';


interface Props {
  onAddVehicle: (vehicle: Vehicle) => void; 
  onUpdateVehicle: (vehicle: Vehicle) => void; 
  onDeleteVehicle: (id: number) => void; 
  editingVehicle: Vehicle | null; 
  vehicles: Vehicle[]; 
}

const VehicleForm: React.FC<Props> = ({ onAddVehicle, onUpdateVehicle, onDeleteVehicle, editingVehicle, vehicles }) => {
  const [brand, setBrand] = useState('');
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');

  // Efeito para preencher o formulário com dados do veículo quando um veículo para edição é selecionado.
  useEffect(() => {
    if (editingVehicle) {
      setBrand(editingVehicle.brand);
      setPlate(editingVehicle.plate);
      setModel(editingVehicle.model);
    }
  }, [editingVehicle]); 

  // Função para lidar com a submissão do formulário.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.
    if (!brand || !plate || !model) {
      // Verifica se todos os campos foram preenchidos.
      showErrorMessage('Por favor, preencha todos os campos para continuar o cadastro.');
      return;
    }
    const newVehicle: Vehicle = {
      // Cria um novo objeto de veículo.
      id: editingVehicle ? editingVehicle.id : Date.now(), // Usa o ID existente ou gera um novo.
      brand,
      plate,
      model,
    };
    if (editingVehicle) {
      // Se estiver editando, chama a função de atualização.
      onUpdateVehicle(newVehicle);
      showSuccessMessage('Edição do veículo finalizada com sucesso!');
    } else {
      // Se for um novo veículo, chama a função de adição.
      onAddVehicle(newVehicle);
      showSuccessMessage('Veículo cadastrado com sucesso!');
    }
    // Reseta os campos do formulário.
    setBrand('');
    setPlate('');
    setModel('');
  };

  // Função para lidar com a exclusão de um veículo.
  const handleDelete = (id: number) => {
    onDeleteVehicle(id);
    showDeleteSuccessMessage('Veículo excluído com sucesso!');
  };

  // Funções para mostrar mensagens de erro e sucesso usando react-toastify.
  const showErrorMessage = (message: string) => {
    toast.error(message, { 
        position: "top-right",
        autoClose: 3000, 
    });
  };

  const showSuccessMessage = (message: string) => {
    toast.success(message, { 
        position: "top-right",
        autoClose: 3000,
    });
  };

  const showDeleteSuccessMessage = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div>
  <ToastContainer className="toast-container" /> 
  <form onSubmit={handleSubmit} className="driver-form"> 
    <input type="text" placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field" /> {/* Adiciona a mesma classe para os campos de entrada */}
    <input type="text" placeholder="Modelo" value={model} onChange={(e) => setModel(e.target.value)} className="input-field" /> {/* Adiciona a mesma classe para os campos de entrada */}
    <input type="text" placeholder="Placa" value={plate} onChange={(e) => setPlate(e.target.value)} className="input-field" /> {/* Adiciona a mesma classe para os campos de entrada */}
    <button type="submit" className="submit-button"> {/* Adiciona a mesma classe para o botão de submissão */}
      {editingVehicle ? 'Atualizar Veículo' : 'Adicionar Veículo'}
    </button>
  </form>
  {/* Lista de veículos com opção de exclusão para cada um. */}
  <div className="vehicle-list"> 
    <ul>
      {vehicles.map(vehicle => (
        <li key={vehicle.id}>
          {`${vehicle.brand} - ${vehicle.model} - ${vehicle.plate}`}
          <button onClick={() => handleDelete(vehicle.id)} className="delete-button">Excluir</button> 
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default VehicleForm;
