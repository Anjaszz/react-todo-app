// src/main.jsx atau src/App.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
      <footer className="w-full bg-blue2">
        <h3 className='flex flex-row justify-center font-medium pt-5'>Created by Anjaszz</h3>
        <ul className="flex flex-row gap-8 p-5 justify-center">
          <li><a target='blank' href="https://anjaszzz.my.id" className='hover:text-red-500'><i className="fa-brands fa-square-facebook fa-xl "></i></a></li>
          <li><i className="fa-brands fa-square-instagram fa-xl"></i></li>
          <li><i className="fa-brands fa-square-github fa-xl"></i></li>
          <li><i className="fa-brands fa-linkedin fa-xl"></i></li>
        </ul>
      </footer>
    );
  };
  
  export default Footer;
  