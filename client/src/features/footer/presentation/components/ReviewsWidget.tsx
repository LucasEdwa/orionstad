import React from 'react';
import type { ReviewsWidget as ReviewsWidgetType } from '../../domain/entities/Footer';

interface ReviewsWidgetProps {
  widget: ReviewsWidgetType;
}

export const ReviewsWidget: React.FC<ReviewsWidgetProps> = ({ widget }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm py-3">
      <div className="max-w-7xl mx-auto px-4">
        <iframe
          src={widget.src}
          title={widget.title}
          height={widget.height}
          className="w-full border-0 block overflow-hidden bg-transparent rounded"
          data-reactroot
        ></iframe>
      </div>
    </div>
  );
};
