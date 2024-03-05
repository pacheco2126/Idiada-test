import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { VehicleView } from '../../domain/vehicleView';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
  providers: [MessageService]
})
export class VehiclesListComponent implements OnInit {

  vehicleList: VehicleView[];
  vehicle: VehicleView;
  showAdd = false;
  showEdit = false;
  msgsAdded: any[] = [];
  msgsEdited: any[] = [];
  msgsDeleted: any[] = [];
  showCloneDialog = false;
  showDeleteDialog = false;
  newPlateNumber: string;
   

  constructor(private vehiclesService: VehiclesService, private router: Router, private messageService: MessageService) {
  }

  /**
   * Metodo para que se carguen los vehiculos al iniciar la pagina
   */
  ngOnInit() {
    this.loadVehicles();
  }

/**
 * Metodos para agregar un vehiculo y mostrar mensaje
 */
  addVehicle() {
    this.showAdd = true;
  }

  public onVehicleAdded() {
    this.showAdd = false;
    this.loadVehicles();
    this.showMessageAdded('success', 'Vehicle added successfully');
  }

  private showMessageAdded(severity: string, detail: string) {
    this.messageService.add({ severity: severity, summary: severity.toUpperCase(), detail: detail });
    this.clearMessagesAfterTimeout('added');

  }


  /**
   * Metodo para cargar los vehiculos
   */
  private loadVehicles() {
    this.vehiclesService.loadVehicles().subscribe(response => this.onVehicleListCallSuccess(response));
  }

  private onVehicleListCallSuccess(response) {
    this.vehicleList = response.map(vehicle => {
      return new VehicleView(vehicle.id, vehicle.plate, vehicle.manufacturer, vehicle.make, vehicle.commercialName,
        vehicle.vinNumber, vehicle.capacity);
    });
  }

/**
 *  Metodos para eliminar un vehiculo
 * @param vehicle es el vehiculo que se va a eliminar
 */
  deleteVehicle(vehicle: VehicleView) {
    this.showDeleteDialog = true;
    this.vehicle = vehicle;
  }

  public deleteVehicleConfirmed() {
    const deleteVehicle: VehicleView = { ...this.vehicle };
    this.vehiclesService.deleteVehicle(deleteVehicle.id).subscribe(
      () => {
        this.showDeleteDialog = false; 
        this.loadVehicles(); // Recargar la lista de vehículos
        this.showMessageAdded('success', 'Vehicle Deleted successfully');
        this.clearMessagesAfterTimeout('deleted');
      },
      error => {
        console.error('Error deleting vehicle:', error);
      }
    );
  }

  cancelDelete() {
    this.showDeleteDialog = false; // Cerrar el diálogo
    this.newPlateNumber = ''; // Limpiar el valor del nuevo número de placa
  }

  
  /**
   * Metodos para clonar un vehiculo
   * @param vehicle es el vehiculo que se va a clonar
   */

cloneVehicle(vehicle: VehicleView) {
  this.vehicle = { ...vehicle }; // Guarda vehículo 
  this.showCloneDialog = true; 
} 

cloneVehicleWithNewPlate() {
  if (this.newPlateNumber) {
    const clonedVehicle: VehicleView = { ...this.vehicle };
    clonedVehicle.plate = this.newPlateNumber;
    this.vehiclesService.createVehicle(clonedVehicle).subscribe(
      () => {
        this.showCloneDialog = false;
        this.newPlateNumber = ''; 
        this.loadVehicles(); 
        this.showMessageAdded('success', 'Vehicle cloned successfully');
        this.clearMessagesAfterTimeout('added');
      },
      error => {
        console.error('Error cloning vehicle:', error);
      }
    );
  }
}

cancelClone() {
  this.showCloneDialog = false; // Cerrar el diálogo
  this.newPlateNumber = ''; // Limpiar el valor del nuevo número de placa
}

/**
 * Metodos para editar un vehiculo 
 * @param vehicle es el vehiculo que se va a editar
 */  


  editVehicle(vehicle: VehicleView) {
    this.showEdit = true;
    this.vehicle = vehicle;
    console.log('Edit vehicle:', vehicle);
  }

  public onVehicleUpdated() {
    this.showEdit = false;
    this.loadVehicles();
    this.showMessageEdited('success', 'Vehicle updated successfully');
  }

  private showMessageEdited(severity: string, detail: string) {
    this.messageService.add({ severity: severity, summary: severity.toUpperCase(), detail: detail });
    this.clearMessagesAfterTimeout('edited');

  }
  

/**
 * Metodos para limpiar mensajes y que no se queden en pantalla
 */

  private clearMessagesAfterTimeout(type: string) {
    if ((type === 'added')||(type === 'edited')||(type === 'deleted')){
      setTimeout(() => {
        this.clearMessages('added');
      }, 3000); // 3 segundos
    }
  }

  private clearMessages(type: string) {
    if (type === 'added') {
      this.msgsAdded = [];
    } else if (type === 'edited') {
      this.msgsEdited = [];
    } else if (type === 'deleted') {
      this.msgsDeleted = [];
    }
  }

  
/**
 * Método para ordenar los vehículos por fabricante
 * Varios métodos similares para ordenar por otros campos
 * para hacerlo más interactivo
 */

  // Método para ordenar los vehículos por fabricante
  sortVehiclesByManufacturer() {
    this.vehicleList.sort((a, b) => {
      return a.manufacturer.localeCompare(b.manufacturer);
    });
  }

  // Método para ordenar los vehículos por marca
  sortVehiclesByMake() {
    this.vehicleList.sort((a, b) => {
      return a.make.localeCompare(b.make);
    });
  }

  // Método para ordenar los vehículos por nombre comercial
  sortVehiclesByCommercialName() {
    this.vehicleList.sort((a, b) => {
      return a.commercialName.localeCompare(b.commercialName);
    });
  }

  // Método para ordenar los vehículos por placa
  sortVehiclesByPlate() {
    this.vehicleList.sort((a, b) => {
      const plateA = this.extractLetters(a.plate);
      const plateB = this.extractLetters(b.plate);
      return plateA.localeCompare(plateB);
    });
  }

  // Método para ordenar los vehículos por ID
  sortVehiclesById() {
    this.vehicleList.sort((a, b) => a.id - b.id);
  }
// Método para extraer las letras de la matrícula para ordenar por ellas
  extractLetters(plate: string): string {
    // Extrae las letras de la matrícula (los tres últimos caracteres)
    return plate.slice(-3);
  }

}