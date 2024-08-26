/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navigation = ({ Listitem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue2 p-5 h-full">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl text-gray-600 font-bold">MyLogo</h1>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-600">
          <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '24px' }}></i>
        </button>
      </div>
      <ul
        className={`md:flex md:flex-row md:gap-8 md:items-center md:ml-auto md:static absolute inset-0 bg-blue2 p-5 md:p-0 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {isOpen && (
          <div className="absolute top-4 right-4">
            <button onClick={toggleMenu} className="text-gray-600">
              <i className="fa-solid fa-times" style={{ fontSize: '24px' }}></i>
            </button>
          </div>
        )}
        {Listitem.map((item) => (
          <li className="hover:text-blue-50 py-2 md:py-0" key={item.id}>
            <Link to={item.url} onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
  );
};

export default Navigation;
