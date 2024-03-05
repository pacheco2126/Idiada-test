package com.idiada.exercise.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.idiada.exercise.domain.Vehicle;
import com.idiada.exercise.dto.CreateVehicleDTO;
import com.idiada.exercise.dto.VehicleDTO;

@Component
public class VehicleConverter {
	
	@Autowired
    private ModelMapper modelMapper;
	
	public VehicleDTO convertToDto(Vehicle vehicle) {
		VehicleDTO vehicleDTO = modelMapper.map(vehicle, VehicleDTO.class);
	    return vehicleDTO;
	}

	public Vehicle convertToEntity(VehicleDTO vehicleDTO) {
		Vehicle vehicle = modelMapper.map(vehicleDTO, Vehicle.class);
	    return vehicle;
	}
	
	public Vehicle convertToEntity(CreateVehicleDTO createVehicleDTO) {
		Vehicle vehicle = modelMapper.map(createVehicleDTO, Vehicle.class);
	    return vehicle;
	}
}
