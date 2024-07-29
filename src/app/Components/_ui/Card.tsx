import React from 'react';


interface CardProps {
  title: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon }) => {
  return (
    <div className="flex justify-start items-center p-4 w-full bg-white rounded-lg">
      <div className='flex flex-col w-full gap-5'>
      <div className="text-orange-500">
        {icon}
      </div>
      <div className="flex w-full  text-gray-700">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      </div>
    </div>
  );
};

export default Card;
