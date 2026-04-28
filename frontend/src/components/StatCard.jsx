const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-60 text-center hover:shadow-lg transition">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;   //Reusable comp ->use anywhere 