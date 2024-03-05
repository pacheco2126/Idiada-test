import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleView } from '../../domain/vehicleView';
import { VehiclesService } from '../../services/vehicles/vehicles.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Output() vehicleAdded: EventEmitter<void> = new EventEmitter<void>();
  vehicleForm: FormGroup;

  /**
   *  Constructor para inicializar el formulario y el servicio de vehiculos
   * @param fb  Inicializar el formulario
   * @param vehiclesService   Servicio de vehiculos (funciones para agregar, editar, eliminar y obtener vehiculos)
   */
  constructor(private fb: FormBuilder, private vehiclesService: VehiclesService) {
    this.createForm();
  }

  /**
   * Metodo para inicializar el formulario
   */
  createForm() {
    this.vehicleForm = this.fb.group({
      plate: ['0000-XXX', Validators.required],
      manufacturer: ['', Validators.required],
      make: ['', Validators.required],
      commercialName: ['', Validators.required],
      vinNumber: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  /**
   * Metodo para enviar el formulario con los datos del vehiculo para agregar
   */
  onSubmit() {
    if (this.vehicleForm.valid) {
      const newVehicle: VehicleView = this.vehicleForm.value;
      this.vehiclesService.createVehicle(newVehicle).subscribe(response => {
        // Si la solicitud fue exitosa, emitir el evento para indicar que se agregó un vehículo
        this.vehicleAdded.emit();
        this.vehicleForm.reset();
      }, error => {
        // Manejar errores si la solicitud no se completó con éxito
        console.error('Error al agregar el vehículo:', error);
      });
    }
  }
}
