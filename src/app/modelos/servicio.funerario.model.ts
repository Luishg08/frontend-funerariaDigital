export class ServicioFunerarioModel {
    id_servicio_funerario?: number;
    ubicacion_cuerpo?: number;
    tipo_sepultura?: string;
    servicio_traslado?: boolean;
    fecha_hora_ingreso?: Date;
    fecha_hora_salida?: Date;
    codigo_unico?: string;
    estado_codigo_unico?: boolean;
    notificado?: boolean;
}