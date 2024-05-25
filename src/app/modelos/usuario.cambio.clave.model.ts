import { UsuarioModel } from "./usuario.model";

export class UsuarioCambioClaveModel{
    user?: UsuarioModel;
    claveActual?: string= "";
    claveNueva?: string= "";
    confirmacionClave?: string= "";
}