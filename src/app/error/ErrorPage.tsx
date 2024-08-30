const ErrorPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <img
            src="assets/sionline.jpg"
            alt="Logo"
            className="mx-auto w-auto h-40"
          />
          <h1 className="text-6xl font-bold text-red-600">{`OOPS`}</h1>
          <p className="mt-4 text-2xl font-medium text-red-500">
            {`THIS PAGE IS NO LONGER AVAILABLE!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
