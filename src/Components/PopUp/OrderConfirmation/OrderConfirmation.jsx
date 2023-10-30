/* eslint-disable react/prop-types */
import "./OrderConfirmation.css";

const OrderConfirmation = ({ state }) => {
  return (
    <div className="flex justify-center ">
      <div className="confirmationCard">
        <button onClick={state} className="dismiss" type="button">
          X
        </button>
        <div className="header">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="content">
            <span className="title">Order Confirmed</span>
            <p className="message">
              Thank you for your purchase. you package will be delivered within
              2 days of your purchase
            </p>
          </div>
          <div className="actions">
            <button className="history" type="button">
              History
            </button>
            <button className="track" type="button">
              Track my package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
