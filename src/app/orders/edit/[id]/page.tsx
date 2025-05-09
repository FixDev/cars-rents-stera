"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, updateOrder, getDataOrders } from "@/services";
import { CheckCircle } from "lucide-react";
import { DataOrder } from "@/types";

export default function EditOrder() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState({
    id: "",
    name: "",
    order_date: "",
    pickup_date: "",
    dropoff_date: "",
    pickup_location: "",
    dropoff_location: "",
  });
  const [cars, setCars] = useState<DataOrder>(); // Store the list of cars
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch the order by ID and the list of cars
  useEffect(() => {
    const fetchOrderAndCars = async () => {
      try {
        const orderData = await getOrderById(id as string);
        setForm(orderData);

        const carData = await getDataOrders(); // Fetch cars data
        setCars(carData); // Set the cars to the state
      } catch (error) {
        console.error("Failed to fetch order or cars:", error);
      }
    };
    fetchOrderAndCars();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "id") {
      const selectedCar = cars?.find((car) => car.id === value);
      setForm({
        ...form,
        [name]: value,
        name: selectedCar ? selectedCar?.name || "" : "", // Update name when id changes
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateOrder(params.id as string, form);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push("/orders"); // Redirect after updating
      }, 3000);
    } catch (error) {
      console.error("Failed to update order", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-6">Edit Order</h1>

      {showAlert && (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Order updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Car ID Dropdown */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="id" className="w-40">
            Car
          </label>
          <select
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          >
            <option value="">Select a car</option>
            {cars?.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Date */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="order_date" className="w-40">
            Order Date
          </label>
          <input
            type="date"
            id="order_date"
            name="order_date"
            value={form.order_date}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          />
        </div>

        {/* Pickup Date */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="pickup_date" className="w-40">
            Pickup Date
          </label>
          <input
            type="date"
            id="pickup_date"
            name="pickup_date"
            value={form.pickup_date}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          />
        </div>

        {/* Dropoff Date */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="dropoff_date" className="w-40">
            Dropoff Date
          </label>
          <input
            type="date"
            id="dropoff_date"
            name="dropoff_date"
            value={form.dropoff_date}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          />
        </div>

        {/* Pickup Location */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="pickup_location" className="w-40">
            Pickup Location
          </label>
          <input
            type="text"
            id="pickup_location"
            name="pickup_location"
            value={form.pickup_location}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          />
        </div>

        {/* Dropoff Location */}
        <div className="flex gap-8 mb-4">
          <label htmlFor="dropoff_location" className="w-40">
            Dropoff Location
          </label>
          <input
            type="text"
            id="dropoff_location"
            name="dropoff_location"
            value={form.dropoff_location}
            onChange={handleChange}
            className="border-2 flex-1 px-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            className="border p-2 bg-gray-600 text-white rounded"
            onClick={() => router.push("/orders")}
          >
            Batal
          </button>
          <button
            type="submit"
            className="border p-2 bg-green-600 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Update Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
