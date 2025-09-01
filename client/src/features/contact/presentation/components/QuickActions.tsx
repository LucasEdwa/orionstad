import type { QuickAction } from '../../domain/entities/Contact';
import { ContactIconService } from '../../application/ContactIconService';
import { memo } from 'react';

interface QuickActionsProps {
  quickActions: QuickAction[];
}

export const QuickActions = memo<QuickActionsProps>(({ quickActions }) => {
  const iconService = new ContactIconService();

  return (
    <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = iconService.getIconComponent(action.icon);
          const styles = iconService.getQuickActionStyles(action);
          
          return (
            <a
              key={index}
              href={action.href}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`${styles.backgroundColor} p-4 rounded-full mb-4 ${styles.hoverColor} transition-colors`}>
                  <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                <span className="mt-3 text-purple-600 font-medium group-hover:underline">
                  {action.action}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
});
