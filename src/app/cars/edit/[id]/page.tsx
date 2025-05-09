"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { editCar, getDataCarById } from "@/services";
import { CheckCircle } from "lucide-react";

interface Form {
  name: string;
  month_rate: number;
  day_rate: number;
  image: string;
}

export default function EditCars() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState<Form>({
    name: "",
    month_rate: 0,
    day_rate: 0,
    image: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCar = async () => {
    if (!id) return;
    try {
      const res = await getDataCarById(id);
      setForm({
        name: res.name || "",
        month_rate: res.month_rate,
        day_rate: res.day_rate,
        image: res.image || "",
      });
    } catch (error) {
      console.error("Failed to fetch car:", error);
    }
  };

  useEffect(() => {
    getCar();
  }, [id]);

  const editSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    try {
      await editCar(id, form);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push("/cars");
      }, 3000);
    } catch (error) {
      console.error("Failed to edit car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="p-20" onSubmit={editSubmit} onReset={() => router.back()}>
      <h1 className="text-2xl font-bold mb-6">Edit Car</h1>

      {showAlert && (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Berhasil update</span>
        </div>
      )}

      <div className="flex gap-8 mb-4">
        <label htmlFor="name" className="w-40">
          Nama Mobil
        </label>
        <input
          className="border-2 flex-1 px-2"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="flex gap-8 mb-4">
        <label htmlFor="monthly_rate" className="w-40">
          Harga Bulanan
        </label>
        <input
          type="number"
          className="border-2 flex-1 px-2"
          id="monthly_rate"
          value={form.month_rate}
          onChange={(e) =>
            setForm({ ...form, month_rate: parseFloat(e.target.value) })
          }
        />
      </div>

      <div className="flex gap-8 mb-4">
        <label htmlFor="day_rate" className="w-40">
          Harga Harian
        </label>
        <input
          type="number"
          className="border-2 flex-1 px-2"
          id="day_rate"
          value={form.day_rate}
          onChange={(e) =>
            setForm({ ...form, day_rate: parseFloat(e.target.value) })
          }
        />
      </div>

      <div className="flex gap-8 mb-4">
        <label htmlFor="image" className="w-40">
          Gambar
        </label>
        <input
          className="border-2 flex-1 px-2"
          id="image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </div>

      <img
        className="mt-4 mb-6"
        src={
          form.image ||
          "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg"
        }
        alt="car"
        width={200}
      />

      <div className="flex gap-4 mt-4">
        <button
          type="reset"
          className="border p-2 bg-gray-600 text-white rounded"
        >
          Batal
        </button>
        <button
          type="submit"
          className="border p-2 bg-green-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Edit"}
        </button>
      </div>
    </form>
  );
}
