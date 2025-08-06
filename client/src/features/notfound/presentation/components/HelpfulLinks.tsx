import type { NavigationItem } from '../../domain/entities/NavigationItem';
import { NavigationCard } from './NavigationCard';

interface HelpfulLinksProps {
  items: NavigationItem[];
}

export const HelpfulLinks = ({ items }: HelpfulLinksProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Looking for something specific?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <NavigationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
