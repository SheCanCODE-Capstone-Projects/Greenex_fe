import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}

export function SidebarItem({ label, icon: Icon, active, onClick }: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
          active 
            ? 'bg-green-700 text-white' 
            : 'text-green-100 hover:bg-green-800 hover:text-white'
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </button>
    </li>
  );
}