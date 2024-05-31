import { MetodoPagoModel } from "./metodo.pago.model";

export class MetodosPagoCliente {
    idMetodoPagoCliente?:number;
    metodoPago?:MetodoPagoModel;
    datos?:string;
    cvv?:string;
    estado?:string;
    clienteId?:number;
    tipo?:string;
}