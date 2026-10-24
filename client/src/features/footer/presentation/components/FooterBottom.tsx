import React from 'react';

interface FooterBottomProps {
  copyright: string;
  taglineBottom?: string;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ copyright, taglineBottom }) => {
  return (
    <div className="border-t border-line mt-12 pt-8 flex flex-col sm:flex-row sm:justify-between gap-2">
      <p className="text-muted text-[0.75rem]">
        {copyright}
      </p>
      {taglineBottom && (
        <p className="text-muted text-[0.75rem]">
          {taglineBottom}
        </p>
      )}
    </div>
  );
};
