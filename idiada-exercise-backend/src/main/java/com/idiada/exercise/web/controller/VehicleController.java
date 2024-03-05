package com.idiada.exercise.web.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.idiada.exercise.domain.Vehicle;
import com.idiada.exercise.dto.CreateVehicleDTO;
import com.idiada.exercise.dto.VehicleDTO;
import com.idiada.exercise.services.VehicleService;
import com.idiada.exercise.web.converter.VehicleConverter;

@CrossOrigin(origins = "*", allowCredentials = "true", methods = { RequestMethod.GET,
		RequestMethod.POST,
		RequestMethod.PUT,
		RequestMethod.DELETE,
		RequestMethod.OPTIONS })

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private VehicleConverter vehicleConverter;

	/**
	 * Método que devuelve todos los vehículos de la base de datos
	 * 
	 * @return Lista de vehículos
	 */
	@GetMapping
	@ResponseBody
	public List<VehicleDTO> getAllVehicles() {
		List<Vehicle> vehicles = vehicleService.listAllVehicles();
		return vehicles.stream()
				.map(vehicleConverter::convertToDto)
				.collect(Collectors.toList());
	}

	/**
	 * Método que crea un vehículo en la base de datos
	 * 
	 * @param dto Vehículo a crear
	 * @return Vehículo creado
	 */
	@PostMapping
	@ResponseBody
	public VehicleDTO createVehicle(@RequestBody CreateVehicleDTO dto) {
		Vehicle vehicle = vehicleService.createVehicle(vehicleConverter.convertToEntity(dto));
		return vehicleConverter.convertToDto(vehicle);
	}

	/**
	 * Método que devuelve un vehículo por su id
	 * 
	 * @param id Id del vehículo
	 * @return Vehículo con el id especificado
	 */
	@GetMapping("/{id}")
	@ResponseBody
	public VehicleDTO getVehicleById(@PathVariable Integer id) {
		Vehicle vehicle = vehicleService.getVehicleById(id);
		return vehicleConverter.convertToDto(vehicle);
	}

	/**
	 * Método que actualiza un vehículo por su id
	 * 
	 * @param id  Id del vehículo
	 * @param dto Vehículo actualizado
	 * @return Vehículo actualizado
	 */
	@PutMapping("/{id}")
	@ResponseBody
	public ResponseEntity<VehicleDTO> updateVehicleById(@PathVariable Integer id, @RequestBody CreateVehicleDTO dto) {
		Vehicle vehicleToUpdate = vehicleService.getVehicleById(id);
		if (vehicleToUpdate != null) {
			Vehicle updatedVehicle = vehicleService.updateVehicleById(id, vehicleConverter.convertToEntity(dto));
			return ResponseEntity.ok(vehicleConverter.convertToDto(updatedVehicle));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	/**
	 * Método que elimina un vehículo por su id
	 * 
	 * @param id Id del vehículo
	 * @return Vehículo eliminado
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<Void> deleteVehicleById(@PathVariable Integer id) {
		Vehicle vehicle = vehicleService.getVehicleById(id);
		if (vehicle != null) {
			vehicleService.deleteVehicleById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
