export interface Position {
  lat: number;
  lng: number;
}

export interface Data {
  positions: Position[];
}

export interface Cluster {
  map: any;
  averageCenter: boolean;
  minLevel: number;
}
