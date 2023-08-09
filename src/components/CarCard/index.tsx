import React from "react";
import ImgFallBack from "components/ImgFallBack";

type Props = {
  title: string;
  price: number;
  photo: string;
  onAddToCart: () => void;
};

export default function CarCard(props: Props) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <ImgFallBack
          src={props?.photo}
          fallback={process.env.PUBLIC_URL + "/assets/photo-icon.svg"}
          fallbackClassName="bg-gray-300 p-10 rounded-s-md bg-gray-200 w-full"
          alt=""
          className="rounded-s-md bg-gray-200 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props?.title}</h2>
        <p>{props?.price?.toLocaleString()} THB/Day</p>
        <div className="card-actions w-full">
          <button
            className="btn btn-block bg-blue-500 text-white border-0"
            onClick={() => props?.onAddToCart()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
