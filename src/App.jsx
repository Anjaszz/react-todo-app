import Navigation from "./components/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  const Listitem = [
    {
      id: 1,
      name: "Home",
      url: "/"
    },
    {
      id: 2,
      name: "About",
      url: "/about"
    },
    {
      id: 3,
      name: "Contact",
      url: "/contact"
    },
    {
      id: 4,
      name: "Todo",
      url: "/todo"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation Listitem={Listitem} />
      <main className="flex-grow mx-auto my-5  w-full max-w-4xl p-10 bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
