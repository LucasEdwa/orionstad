import { Link } from "react-router";
import type { NavigationItem } from '../../domain/entities/NavigationItem';

interface NavigationCardProps {
  item: NavigationItem;
}

export const NavigationCard = ({ item }: NavigationCardProps) => {
  return (
    <Link
      to={item.path}
      className="group p-4 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100 hover:border-purple-200"
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
        {item.icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </Link>
  );
};
