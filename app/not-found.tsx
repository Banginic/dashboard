export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg">Oops! The page you are looking for does not exist.</p>
      <a
        href="/"
        className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
      >
        Go Home
      </a>
    </div>
  );
}
