import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export function LanguageSwitch() {
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className=" w-fit sm:w-[120px] bg-[var(--color-bg-main)] focus-visible:outline-none focus:ring focus:border-transparent focus:ring-[var(--border-color-hover)]">
        <SelectValue placeholder={isMobile ? 'EN 🇺🇸' : 'English 🇺🇸'} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--color-grey-0)]">
        <SelectGroup>
          <SelectItem value="en">
            {isMobile ? 'EN 🇺🇸' : 'English 🇺🇸'}
          </SelectItem>
          <SelectItem value="fr">
            {isMobile ? 'FR 🇫🇷' : 'Français 🇫🇷'}
          </SelectItem>
          <SelectItem value="es">
            {isMobile ? 'ES 🇪🇸' : 'Español 🇪🇸'}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
