"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDataCarById } from "@/services";

interface Car {
  name: string;
  month_rate: number;
  day_rate: number;
  image: string;
}

export default function CarDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [car, setCar] = useState<Car | null>(null);

  const getCarDetails = async () => {
    if (!id) return;
    try {
      const res = await getDataCarById(id);
      setCar(res);
    } catch (error) {
      console.error("Failed to fetch car details:", error);
    }
  };

  useEffect(() => {
    getCarDetails();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-6">Detail Mobil</h1>

      <div className="flex gap-8 mb-6">
        <div>
          <img
            className="w-64 h-64 object-cover rounded-lg"
            src={
              car.image ||
              "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg"
            }
            alt={car.name}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{car.name}</h2>
          <p className="mt-4 text-lg">
            <strong>Harga Bulanan:</strong> Rp {car.month_rate.toLocaleString()}
          </p>
          <p className="mt-2 text-lg">
            <strong>Harga Harian:</strong> Rp {car.day_rate.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="border p-2 bg-gray-600 text-white rounded"
          onClick={() => router.push("/cars")}
        >
          Kembali ke Daftar Mobil
        </button>
        <button
          className="border p-2 bg-yellow-600 text-white rounded"
          onClick={() => router.push(`/cars/edit/${id}`)}
        >
          Edit Mobil
        </button>
      </div>
    </div>
  );
}
