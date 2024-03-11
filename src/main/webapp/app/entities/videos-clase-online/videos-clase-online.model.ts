
export interface IVideosClaseOnline {
  id: number;
  tituloVideo?: string | null;
  urlVideo?: string | null;
}

export type NewVideosClaseOnline = Omit<IVideosClaseOnline, 'id'> & { id: null };
