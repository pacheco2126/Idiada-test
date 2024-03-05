package com.idiada.exercise.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idiada.exercise.domain.Vehicle;
import com.idiada.exercise.persistence.repository.VehicleRepository;
import com.idiada.exercise.services.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepository;

	/**
	 * Método que devuelve todos los vehículos de la base de datos
	 * 
	 * @return Lista de vehículos
	 */
	public List<Vehicle> listAllVehicles() {
		return vehicleRepository.findAll();
	}

	/**
	 * Método que crea un vehículo en la base de datos
	 * 
	 * @param vehicle Vehículo a crear
	 * @return Vehículo creado
	 */
	@Override
	public Vehicle createVehicle(Vehicle vehicle) {
		System.out.println("He llegado al backend como dice" + vehicle.getPlate());
		return vehicleRepository.save(vehicle);
	}

	/**
	 * Método que crea varios vehículos en la base de datos
	 * 
	 * @param vehicles Lista de vehículos a crear
	 * @return Vehículos creados
	 */
	@Override
	public void createVehicles(List<Vehicle> vehicles) {
		vehicleRepository.saveAll(vehicles);
	}

	/**
	 * Método que devuelve un vehículo por su id
	 * 
	 * @param id Id del vehículo
	 * @return Vehículo con el id especificado
	 */
	@Override
	public Vehicle getVehicleById(Integer id) {
		return vehicleRepository.findById(id).orElse(null);
	}

	/**
	 * Método que actualiza un vehículo por su id
	 * 
	 * @param id             Id del vehículo
	 * @param updatedVehicle Vehículo actualizado
	 * @return Vehículo actualizado
	 */
	@Override
	public Vehicle updateVehicleById(Integer id, Vehicle updatedVehicle) {
		Vehicle existingVehicle = vehicleRepository.findById(id).orElse(null);
		if (existingVehicle != null) {
			// Actualizar los campos del vehículo existente con los valores del vehículo
			// actualizado
			existingVehicle.setPlate(updatedVehicle.getPlate());
			existingVehicle.setManufacturer(updatedVehicle.getManufacturer());
			existingVehicle.setMake(updatedVehicle.getMake());
			existingVehicle.setCommercialName(updatedVehicle.getCommercialName());
			existingVehicle.setVinNumber(updatedVehicle.getVinNumber());
			existingVehicle.setCapacity(updatedVehicle.getCapacity());
			// Guardar y devolver el vehículo actualizado
			return vehicleRepository.save(existingVehicle);
		} else {
			return null; // Opcionalmente, puedes lanzar una excepción aquí si prefieres
		}
	}

	/**
	 * Método que elimina un vehículo por su id
	 * 
	 * @param id Id del vehículo
	 */
	@Override
	public void deleteVehicleById(Integer id) {
		vehicleRepository.deleteById(id);
	}

}
