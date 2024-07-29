import clsx from 'clsx';
import React from 'react';

interface CardStatusProps {
  title: string;
  value: string;
  subtitle: string;
  className?: string;
}

const CardStatus: React.FC<CardStatusProps> = ({ title, value, subtitle, className }) => {
  return (
    <div className={clsx(`flex flex-col justify-center bg-white rounded-lg p-6`, className)}>
      <p className="text-sm font-normal text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-lg text-gray-500">{subtitle}</p>
    </div>
  );
};

export default CardStatus;
