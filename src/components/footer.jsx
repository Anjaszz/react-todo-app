// src/main.jsx atau src/App.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
      <footer className="w-full bg-blue2">
        <h3 className='flex flex-row justify-center font-medium'>Created by Anjaszz</h3>
        <ul className="flex flex-row gap-8 p-5 justify-center">
          <li><i className="fa-brands fa-square-facebook fa-xl"></i></li>
          <li><i className="fa-brands fa-square-instagram fa-xl"></i></li>
          <li><i className="fa-brands fa-square-github fa-xl"></i></li>
          <li><i className="fa-brands fa-linkedin fa-xl"></i></li>
        </ul>
      </footer>
    );
  };
  
  export default Footer;
  