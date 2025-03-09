import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex-col flex items-center justify-center">
      <h1 className="text-5xl font-bold text-black">404</h1>
      <h2 className="text-2xl mt-5 font-semibold">Not Found</h2>
      <p className="mt-2 text-gray-400 text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-lg text-center w-[300px] bg-black text-white py-4 mt-10"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
