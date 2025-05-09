import { Cars, DataCar, DataOrder, Orders } from "@/types";
import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getDataCar = async () => {
  const res = await client.get<DataCar>(`/cars`);

  return res.data;
};

export const getDataCarById = async (id: string) => {
  const res = await client.get<Cars>(`/cars/${id}`);

  return res.data;
};

export const addCar = async (form: any) => {
  const res = await client.post(`/cars`, form);

  return res.data;
};

export const editCar = async (id: string, form: any) => {
  const res = await client.put(`/cars/${id}`, form);

  return res.data;
};

export const deleteCar = async (id: string) => {
  const res = await client.delete(`/cars/${id}`);

  return res.data;
};

export const getDataOrders = async () => {
  const res = await client.get<DataOrder>("/orders");
  return res.data;
};

export const getOrderById = async (id: string) => {
  const res = await client.get<Orders>(`/orders/${id}`);

  return res.data;
};

export const addOrder = async (orderData: any) => {
  const res = await client.post("/orders", orderData);
  return res.data;
};

export const updateOrder = async (id: string, orderData: any) => {
  const res = await client.put(`/orders/${id}`, orderData);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await client.delete(`/orders/${id}`);
  return res.data;
};
