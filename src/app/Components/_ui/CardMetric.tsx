import React from 'react';
import Image from 'next/image';

interface CardMetricProps {
  image?: string;
  title: string;
  subtitle: string;
  p: string;
}

const CardMetric: React.FC<CardMetricProps> = ({ image, title, subtitle, p }) => {
  return (
    <div className="flex items-center bg-white rounded-lg h-auto p-6 row-span-2">
      {image && (
        <div className="flex-shrink-0 mr-6">
          <Image src={image} alt="Card Image" width={150} height={150} className="w-52 h-auto" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">{p}</p>
        <p className="text-6xl font-bold">{title}</p>
        <p className="text-lg text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default CardMetric;
