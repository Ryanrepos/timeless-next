import { Button } from '@mui/material';
import { Link } from 'phosphor-react';
import React, { useState } from 'react';

const Navbar = () => {
  const [isBrandsVisible, setIsBrandsVisible] = useState(false);

  const toggleBrands = () => {
    setIsBrandsVisible((prev) => !prev); // Toggle the visibility
  };

  return (
    <div>
      <nav>
        <button onClick={toggleBrands}>Brands</button>
      </nav>

      {isBrandsVisible && (
        <div className="popup">
        <Link href='/property'>
         <ul>
          <span>Rolex</span>
          </ul>
        </Link>
        </div>
      )}

      <style jsx>{`
        .popup {
          position: absolute;
          top: 50px;
          background: white;
          border: 1px solid gray;
          padding: 10px;
          border-radius: 5px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
