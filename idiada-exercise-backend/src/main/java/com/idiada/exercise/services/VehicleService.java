package com.idiada.exercise.services;

import java.util.List;

import com.idiada.exercise.domain.Vehicle;


public interface VehicleService {
	
	List<Vehicle> listAllVehicles();
	
	Vehicle createVehicle(Vehicle vehicle);
	
	void createVehicles(List<Vehicle> vehicles);

	Vehicle getVehicleById(Integer id);

	Vehicle updateVehicleById(Integer id, Vehicle vehicle);

	void deleteVehicleById(Integer id);

}
