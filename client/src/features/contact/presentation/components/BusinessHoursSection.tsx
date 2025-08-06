import React from 'react';
import type { BusinessHours } from '../../domain/entities/Contact';
import { FaClock } from 'react-icons/fa';

interface BusinessHoursProps {
  businessHours: BusinessHours;
}

export const BusinessHoursSection: React.FC<BusinessHoursProps> = ({ businessHours }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-full">
          <FaClock className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{businessHours.title}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Monday - Friday</span>
          <span className="text-gray-600">{businessHours.weekdays}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="font-medium text-gray-700">Saturday - Sunday</span>
          <span className="text-gray-600">{businessHours.weekends}</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-purple-50 rounded-xl">
        <p className="text-sm text-purple-700">
          <strong>Note:</strong> {businessHours.note}
        </p>
      </div>
    </div>
  );
};
