'use client';

import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Faq.module.css';
import { Tabs } from '@/components/ui/Tabs/Tabs';
import { accordionsConfig, tabsConfig } from '@/app/_home/Faq/config';
import { FaqAccordion } from '@/app/_home/Faq/FaqAccordion';
import { useTranslations } from 'next-intl';

export const Faq = () => {
  const t = useTranslations('FAQ');
  const tabKeys = tabsConfig.map((tab) => tab.value);

  return (
    <>
      <div className={styles.titleWrapper}>
        <Typography tag="h3" variant="h3" text={t('title')} />
      </div>
      <Tabs
        config={tabsConfig}
        renderContent={(activeTab) => (
          <div className={styles.tabContent}>
            <FaqAccordion
              config={accordionsConfig[tabKeys[activeTab]]}
              tabKey={tabKeys[activeTab]}
            />
          </div>
        )}
      />
    </>
  );
};
