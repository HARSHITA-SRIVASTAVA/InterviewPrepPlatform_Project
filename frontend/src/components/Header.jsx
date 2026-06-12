const Header = ({level}) => {

  const username="Coder";
  return (
    <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">

      {/* Search */}

      <div className="w-96">
        <input
          type="text"
          placeholder="Search problems, topics..."
          className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <button className="text-xl">
          
        </button>

        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
          {username.charAt(0)}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {username}
          </p>

          <p className="text-sm text-purple-600">
            Level {level}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Header;