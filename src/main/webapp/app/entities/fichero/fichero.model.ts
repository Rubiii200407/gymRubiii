import { IComentario } from '../comentario/comentario.model';
export interface IFichero {
  id: number;
  contentType: string;
  path: string;
  nombre: string;
  comentario?: IComentario | null;
  tamano?: number | null;
}
export class IFichero {
  id!: number;
  contentType: string = '';
  path: string = '';
  nombre: string = '';
  comentario?: IComentario | null;
  tamano?: number | null;
}
export type NewFichero = Omit<IFichero, 'id'> & { id: null };

export declare type Byte = number;
export interface IFileVM {
  fileName?: string | null;
  contentType?: string | null;
  base64?: string | null;
  byteArray?: Byte[] | null;
  comentario?: IComentario | null;
  tamano?: number | null;
}

export class FileVM implements IFileVM {
  constructor(
    public fileName?: string | null,
    public contentType?: string | null,
    public base64?: string | null,
    public byteArray?: Byte[] | null,
    comentario?: IComentario | null
  ) {}
}
