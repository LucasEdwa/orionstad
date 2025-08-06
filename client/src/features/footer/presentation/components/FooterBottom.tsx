import React from 'react';

interface FooterBottomProps {
  copyright: string;
  taglineBottom?: string;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ copyright, taglineBottom }) => {
  return (
    <div className="border-t border-purple-600 mt-12 pt-8 text-center">
      <p className="text-purple-200 text-sm">
        {copyright}
      </p>
      {taglineBottom && (
        <p className="text-purple-300 text-xs mt-2">
          {taglineBottom}
        </p>
      )}
    </div>
  );
};
