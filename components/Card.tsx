import React from "react";

interface CardProps {
    id: number;
    title: string;
    description: string;
    img_uri: string;
  }

const Card: React.FC<CardProps> = ({id, title, description, img_uri}) => {
  return (
    <div className="max-w-sm border rounded overflow-hidden shadow-lg mr-5 bg-neutral-800 border-neutral-700 p-4 mb-5">
      <img
        src={img_uri}
        alt="Card Image"
        className="w-auto h-auto"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        <p className="text-base text-white">{description}...</p>
      </div>
      <div className="px-6 py-4">
        <a href={`/${id}`} className="bg-transparent border hover:bg-amber-600 text-white font-bold py-2 px-4">
          Details
        </a>
      </div>
    </div>
  );
};
{/* <Link href={`/${service.id}`}>
<a>Detail</a>
</Link> */}
export default Card;
