"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderById } from "@/services"; // Replace with the actual service for fetching order details

interface Order {
  id: string;
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
}

export default function OrderDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);

  const getOrderDetails = async () => {
    if (!id) return;
    try {
      const res = await getOrderById(id); // Fetch order details by ID
      setOrder(res);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-6">Detail Order</h1>

      <div className="flex gap-8 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
          <p className="mt-4 text-lg">
            <strong>Tanggal Order:</strong>{" "}
            {new Date(order.order_date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-lg">
            <strong>Tanggal Pickup:</strong>{" "}
            {new Date(order.pickup_date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-lg">
            <strong>Tanggal Dropoff:</strong>{" "}
            {new Date(order.dropoff_date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-lg">
            <strong>Pickup Location:</strong> {order.pickup_location}
          </p>
          <p className="mt-2 text-lg">
            <strong>Dropoff Location:</strong> {order.dropoff_location}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="border p-2 bg-gray-600 text-white rounded"
          onClick={() => router.push("/orders")}
        >
          Kembali ke Daftar Order
        </button>
        <button
          className="border p-2 bg-yellow-600 text-white rounded"
          onClick={() => router.push(`/orders/edit/${id}`)}
        >
          Edit Order
        </button>
      </div>
    </div>
  );
}
