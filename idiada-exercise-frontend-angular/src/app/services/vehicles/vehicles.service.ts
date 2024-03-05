import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { VehicleView } from '../../domain/vehicleView';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url: string; // = environment.domainUrl + 'vehicles'; donde estan los vehiculos en el backend
  headers: { 'Content-Type': 'application/json' }; // cabeceras para la peticion

  /**
   *  Constructor para inicializar el servicio de vehiculos
   * @param http  Cliente http para realizar peticiones
   */
  constructor(public http: HttpClient) {
    this.url = environment.domainUrl + 'vehicles';
    this.headers = { 'Content-Type': 'application/json' };
  }

  /**
   *  Metodo para obtener todos los vehiculos
   * @returns  Lista de vehiculos
   */
  loadVehicles(): Observable<VehicleView[]> {
    return this.http.get<VehicleView[]>(this.url, { headers: this.headers });
  }

  /**
   *  Metodo para agregar un vehiculo
   * @param vehicleView  Vehiculo con los datos a agregar
   * @returns  Vehiculo agregado
   */
  createVehicle(vehicleView: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(this.url, vehicleView, { headers: this.headers });
  }

  /**
   *  Metodo para eliminar un vehiculo
   * @param id  Identificador del vehiculo a eliminar
   */
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete<VehicleView>(this.url + '/' + id, { headers: this.headers });
  }

  /**
   *  Metodo para actualizar un vehiculo
   * @param vehicleView   Vehiculo con los datos actualizados
   */
  updateVehicle(vehicleView: VehicleView): Observable<VehicleView> {
    return this.http.put<VehicleView>(this.url + '/' + vehicleView.id, vehicleView, { headers: this.headers });
  }

  /**
   *  Metodo para obtener un vehiculo por su identificador
   * @param id  Identificador del vehiculo para hacer la petición
   * @returns   Vehiculo con el identificador proporcionado
   */
  getVehicleById(id: number): Observable<VehicleView> {
    return this.http.get<VehicleView>(this.url + '/' + id, { headers: this.headers });
  }

}
