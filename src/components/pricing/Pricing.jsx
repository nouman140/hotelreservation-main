import React from "react"; // Importing React library
import Back from "../common/Back"; // Importing the Back component
import PriceCard from "../home/price/PriceCard"; // Importing the PriceCard component
import img from "../images/pricing.jpg"; // Importing an image
import "../home/price/price.css"; // Importing CSS styles for the Pricing component

const Pricing = () => {
  return (
    <>
      {/* Pricing section */}
      <section className='pricing mb'> 
        {/* Back component with a title and cover image */}
        <Back name='30 days money back guarantee' title='No Extra Fees. Friendly Support' cover={img} />
        {/* Container for price cards */}
        <div className='price container'>
          {/* PriceCard component */}
          <PriceCard />
        </div>
      </section>
    </>
  );
};

export default Pricing;
