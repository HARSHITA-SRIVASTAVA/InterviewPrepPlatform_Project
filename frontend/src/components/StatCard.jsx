const StatCard = ({ title, value ,icon,iconBg,}) => {
 return (
  <div className="bg-white rounded-2xl p-5 min-w-[220px] flex-1 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${iconBg}`}
    >
      {icon}
    </div>

    <p className="text-gray-500 text-sm mt-4">
      {title}
    </p>

    <h2 className="text-3xl font-bold text-slate-800 mt-2">
      {value}
    </h2>

  </div>
  );
};

export default StatCard;   //Reusable comp ->use anywhere 