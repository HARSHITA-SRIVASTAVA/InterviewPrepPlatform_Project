import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({
  children,
  level = 1,
}) => {
  return (
    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header level={level} />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;