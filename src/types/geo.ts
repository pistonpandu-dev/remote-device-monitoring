export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

export interface GeoAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  formatted: string;
}

export interface GeoLocation {
  coordinates: GeoCoordinates;
  address: GeoAddress | null;
  placeId: string | null;
}

export interface GeoBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
