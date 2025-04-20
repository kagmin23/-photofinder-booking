import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-lg text-gray-600">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-4 rounded bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600"
      >
        Go Home
      </Link>
    </div>
  );
}
