"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { getDataCar, deleteCar } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { DataCar } from "@/types";

export default function Cars() {
  const [data, setData] = useState<DataCar>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await getDataCar();
      setData(res);
    } catch (error) {
      console.error("Error get", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const delCar = async () => {
    setIsDeleting(true);
    try {
      await deleteCar(id);
      await getData();
      setShowAlert(true);
    } catch (error) {
      console.error("delete error", error);
      setShowAlert(false);
    } finally {
      setIsDeleting(false);
      setId("");
      setOpen(false);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  return (
    <div className="p-20">
      <div className="flex justify-between items-center my-8">
        <h1 className="font-bold text-2xl">Cars</h1>
        <Link
          href="/cars/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Mobil
        </Link>
      </div>

      {showAlert && (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Berhasil delete</span>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <Table>
          <TableCaption>A list of your cars.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Month Rate</TableHead>
              <TableHead>Day Rate</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">
                  <Link href={`/cars/detail/${car.id}`}>{car.name}</Link>
                </TableCell>
                <TableCell>{car.month_rate}</TableCell>
                <TableCell>{car.day_rate}</TableCell>
                <TableCell>
                  <img
                    src={
                      car.image ||
                      "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg"
                    }
                    width={200}
                    height={120}
                    alt="car"
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell className="flex gap-4">
                  <Link
                    href={`/cars/edit/${car.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    edit
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      setOpen(true);
                      setId(car.id);
                    }}
                  >
                    delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected car.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={delCar} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
