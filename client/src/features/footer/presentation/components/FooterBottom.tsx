import React from 'react';

interface FooterBottomProps {
  copyright: string;
  taglineBottom?: string;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ copyright, taglineBottom }) => {
  return (
    <div className="border-t border-gray-300 mt-12 pt-8 text-center">
      <p className="text-gray-800 text-sm">
        {copyright}
      </p>
      {taglineBottom && (
        <p className="text-gray-600 text-xs mt-2">
          {taglineBottom}
        </p>
      )}
    </div>
  );
};
