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
      name: "Kalkulator",
      url: "/calc"
    },
    {
      id: 3,
      name: "SmartList",
      url: "https://smart-list-two.vercel.app"
    },
    {
      id: 4,
      name: "Remove Background",
      url: "https://backdrop-remover-me.vercel.app"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation Listitem={Listitem} />
      <main className="flex-grow mx-auto my-2  w-full max-w-4xl p-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
