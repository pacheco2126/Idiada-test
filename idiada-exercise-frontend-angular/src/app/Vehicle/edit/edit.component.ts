import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { VehicleView } from '../../domain/vehicleView';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() vehicleUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Input() vehicle: VehicleView;
  vehicleForm: FormGroup;

/**
 *  Constructor para inicializar el formulario y el servicio de vehiculos
 * @param formBuilder  Inicializar el formulario
 * @param vehiclesService   Servicio de vehiculos (funciones para agregar, editar, eliminar y obtener vehiculos)
 */

  constructor(
    private formBuilder: FormBuilder,
    private vehiclesService: VehiclesService
  ) { }

/**
 * Metodo para inicializar el formulario al cargar la pagina
 */
  ngOnInit(): void {
    this.initForm();
  }

/**
 * Metodo para inicializar el formulario al cargar la pagina al cambiar el vehiculo 
 */
  ngOnChanges(): void {
    if (this.vehicle) {
      this.initForm();
    }
  }

  /**
   * Metodo para inicializar el formulario con los datos del vehiculo seleccionado
   */
  initForm(): void {
    this.vehicleForm = this.formBuilder.group({
      plate: [this.vehicle && this.vehicle.plate ? this.vehicle.plate : '', Validators.required],
      manufacturer: [this.vehicle && this.vehicle.manufacturer ? this.vehicle.manufacturer : '', Validators.required],
      make: [this.vehicle && this.vehicle.make ? this.vehicle.make : '', Validators.required],
      commercialName: [this.vehicle && this.vehicle.commercialName ? this.vehicle.commercialName : '', Validators.required],
      vinNumber: [this.vehicle && this.vehicle.vinNumber ? this.vehicle.vinNumber : '', Validators.required],
      capacity: [this.vehicle && this.vehicle.capacity ? this.vehicle.capacity : '', Validators.required]
    });
  }

/**
 * Metodo para enviar el formulario con los datos del vehiculo seleccionado para actualizar
 */
  onSubmit(): void {
    if (this.vehicleForm.valid && this.vehicle && this.vehicle.id) { // Verificar que vehicle y su id estén definidos
      const updatedVehicle: VehicleView = this.vehicleForm.value;
      updatedVehicle.id = this.vehicle.id; // Asignar el id del vehículo
      this.vehiclesService.updateVehicle(updatedVehicle).subscribe(response => {
        this.vehicleUpdated.emit();
        this.vehicleForm.reset();
      }, error => {
        console.error('Error updating vehicle:', error);
      });
    }
  }
}
