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

import { getDataOrders, deleteOrder } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Orders } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await getDataOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteOrder(id);
      await fetchOrders(); // Refetch orders after deletion
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting order", error);
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
        <h1 className="font-bold text-2xl">Orders</h1>
        <Link
          href="/orders/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Order
        </Link>
      </div>

      {showAlert && (
        <div className="flex items-center gap-3 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Order deleted successfully!</span>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Pickup Date</TableHead>
              <TableHead>Dropoff Date</TableHead>
              <TableHead>Pickup Location</TableHead>
              <TableHead>Dropoff Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    href={`/orders/detail/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order.name}
                  </Link>
                </TableCell>
                <TableCell>{order.order_date}</TableCell>
                <TableCell>{order.pickup_date}</TableCell>
                <TableCell>{order.dropoff_date}</TableCell>
                <TableCell>{order.pickup_location}</TableCell>
                <TableCell>{order.dropoff_location}</TableCell>
                <TableCell className="flex gap-4">
                  <Link
                    href={`/orders/edit/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      setOpen(true);
                      setId(order.id);
                    }}
                  >
                    Delete
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
              selected order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
