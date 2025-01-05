const FloatingMessagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="space-y-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`relative inline-block px-8 py-4 rounded-xl transition-all duration-500 ease-in-out transform ${
                i % 2 === 0
                  ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-2xl"
                  : "bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-2xl"
              } hover:scale-105`}
              style={{
                boxShadow: `0 4px 20px ${i % 2 === 0 ? "rgba(75, 0, 130, 0.3)" : "rgba(255, 105, 180, 0.3)"}`,
              }}
            >
              <div className="max-w-xs text-md opacity-90">
                {i % 2 === 0 ? "Sent: Just checking in!" : "Received: Everything’s great!"}
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-extrabold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default FloatingMessagePattern;