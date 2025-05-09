import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Cars Rent Steradian
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Welcome to the best car rental service in town!
      </p>

      <div className="flex justify-center gap-8">
        <Link
          href="/cars"
          className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
        >
          Cars
        </Link>

        <Link
          href="/orders"
          className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
        >
          Orders
        </Link>
      </div>
    </div>
  );
}
