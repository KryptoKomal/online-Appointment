import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto pb-12">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
