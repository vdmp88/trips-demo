import Image from 'next/image';
import styles from './MobileMenu.module.css';
import { Typography } from '@/components/ui/Typography/Typography';

interface MenuButtonProps {
  label: string;
  subTitle?: string;
  value: string;
  isActive: boolean;
  iconPath?: string;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  value,
  isActive,
  onClick,
  subTitle,
  iconPath,
}) => (
  <button
    value={value}
    onClick={onClick}
    className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
  >
    {subTitle && subTitle}
    {iconPath && (
      <Image
        src={`/locale/${iconPath}.png`}
        alt={label}
        width={24}
        height={24}
      />
    )}
    <Typography variant="semiBold14" text={label} />
  </button>
);

export default MenuButton;
