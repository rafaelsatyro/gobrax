import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Driver, Vehicle } from '../types/types';
import './Style.css';
import Logo from '../img/logo.png';


const HomePage: React.FC = () => {
  // Estados para armazenar a lista de motoristas.
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // useEffect para carregar os motoristas e veículos do localStorage quando o componente é montado.
  useEffect(() => {
    // Carregamento dos motoristas do localStorage.
    const storedDrivers = JSON.parse(localStorage.getItem('drivers') || '[]') as Driver[];
    // Carregamento dos veículos do localStorage.
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]') as Vehicle[];
    // Atualização dos estados com os dados carregados.
    setDrivers(storedDrivers);
    setVehicles(storedVehicles);

    // Verificação para atualizar o estado dos motoristas caso algum veículo tenha sido removido.
    storedDrivers.forEach((driver) => {
      if (driver.vehicleId) {
        const vehicleExists = storedVehicles.some((vehicle) => vehicle.id === driver.vehicleId);
        if (!vehicleExists) {
          const updatedDrivers = drivers.map((d) => {
            if (d.id === driver.id) {
              // Atualização do motorista para remover o vínculo com o veículo inexistente.
              return { ...d, vehicleId: null };
            }
            return d;
          });
          setDrivers(updatedDrivers);
          localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
        }
      }
    });
  }, [drivers, vehicles]);

  // Função para lidar com a seleção de um motorista.
  const handleDriverSelection = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className='main-container'>
        <div className='container-header'>
            <div className='container-button-redirect'>
                <Link to="/driver" className='motoristas-e-veiculos'>Motoristas</Link>
                <Link to="/vehicle" className='motoristas-e-veiculos'>Veículos</Link>
            </div>
            <div className='container-logo'>
                <img src={Logo} alt="logo gobrax" title='Logo Gobrax' />
            </div>  
            <div className='container-button-linkedin'>
                <a href="https://www.linkedin.com/in/rafael-pereira-satyro/" target='_blank'> <button className='button-linkedin'>Linkedin</button></a>
            </div>
        </div>
        <div className='container-selected-driver'>
            {selectedDriver ? (
            <div>
                <h5 className='title-selected-driver'>Selecionado:</h5>
                <p className='p-driver-informations'><strong>Nome:</strong> {selectedDriver.name}</p>
                <p className='p-driver-informations'><strong>Documento:</strong> {selectedDriver.document}</p>
                <p className='p-driver-informations'><strong>Vínculo:</strong> {selectedDriver.vehicleId ? 'Sim' : 'Não'}</p>
                {selectedDriver.vehicleId && (
                <>
                    <h5 className='title-selected-vehicle'>Veículo:</h5>
                    <p className='p-driver-informations'>
                    <strong>Marca:</strong> {vehicles.find((vehicle) => vehicle.id === selectedDriver.vehicleId)?.brand || 'Não encontrado'}
                    </p>
                    <p className='p-driver-informations'>
                    <strong>Modelo:</strong> {vehicles.find((vehicle) => vehicle.id === selectedDriver.vehicleId)?.model || 'Não encontrada'}
                    </p>
                    <p className='p-driver-informations'>
                    <strong>Placa:</strong> {vehicles.find((vehicle) => vehicle.id === selectedDriver.vehicleId)?.plate || 'Não encontrada'}
                    </p>
                </>
                )}
            </div>
            ) : (
            <></>
            )}
      </div>
        <div>
          {drivers.length === 0 ? (
            <p className='empty-search-message'>Nenhum motorista cadastrado.</p>
          ) : (
            <div className='container-table-drivers'>
                <table className='table-drivers'>
                <thead>
                    <tr className='table-row'>
                        <th className='driver-informations-table-title'><p className='title-th'>Selecione</p></th>
                        <th className='driver-informations-table-title'><p className='title-th'>Nome</p></th>
                        <th className='driver-informations-table-title'><p className='title-th'>Documento</p></th>
                        <th className='driver-informations-table-title'><p className='title-th'>Vínculo</p></th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                    <tr key={driver.id} className='table-row'>
                        <td className='driver-informations-table-title'>
                        <input
                            className='input-selected-driver'
                            type="radio"
                            id={`driver-${driver.id}`}
                            name="selectedDriver"
                            onChange={() => handleDriverSelection(driver)}
                        />
                        </td>
                        <td className='driver-informations-table-title'><p className='td-informations-driver'>{driver.name}</p></td>
                        <td className='driver-informations-table-title'><p className='td-informations-driver'>{driver.document}</p></td>
                        <td className='driver-informations-table-title'><p className='td-informations-driver'>{driver.vehicleId ? 'Sim' : 'Não'}</p></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
        </div>
    </div>
  );
};

export default HomePage;