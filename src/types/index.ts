export type DataCar = Cars[];

export interface Cars {
  name: string;
  image: string;
  month_rate: number;
  day_rate: number;
  id: string;
  monthRate?: string;
  dayRate?: string;
  data?: AnyData;
  headers?: Headers;
  order_date?: string;
}

export interface AnyData {
  name?: string;
  image?: string;
  month_rate?: string;
  day_rate?: string;
}

export interface Headers {
  "Content-Type": string;
}

export type DataOrder = Orders[];

export interface Orders {
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  id: string;
  name: string;
  image?: string;
  month_rate: number;
  day_rate: number;
  "(id, updateOrderData) "?: string;
  body?: Body;
  value?: Value;
  car?: string;
  dropOff_location?: string;
}

export interface Body {
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
}

export interface Value {
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
}
