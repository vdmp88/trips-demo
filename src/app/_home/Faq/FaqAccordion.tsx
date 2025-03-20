import { Accordion, AccordionItem } from '@/components/ui/Accordion/Accordion';
import Image from 'next/image';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Faq.module.css';
import { useTranslations } from 'next-intl';

type FaqAccordion = {
  config: AccordionItem[];
  tabKey: string;
};

export const FaqAccordion: React.FC<FaqAccordion> = ({ config, tabKey }) => {
  const t = useTranslations('FAQ');

  return (
    <Accordion
      key={tabKey}
      config={config}
      renderHeader={(title, isOpen, cb, index) => (
        <div
          className={`${styles.accordionHeader} ${isOpen ? styles.isOpen : ''}`}
          onClick={cb}
        >
          <div className={styles.accordionTitle}>
            {index && <Typography variant="semiBold16" text={`0${index}`} />}
            <Typography tag="p" variant="semiBold16" text={t(title)} />
          </div>
          <Image
            className={`${styles.arrow} ${isOpen && styles.activeArrow}`}
            src="/svg/arrow.svg"
            alt="svg arrow"
            height={24}
            width={24}
          />
        </div>
      )}
      renderContent={(content) => (
        <div className={styles.accordionContent}>
          <Typography variant="medium14" text={t(content)} />
        </div>
      )}
    />
  );
};
