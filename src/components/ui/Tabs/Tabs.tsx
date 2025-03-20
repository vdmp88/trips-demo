'use client';

import React, { useMemo, useState } from 'react';
import styles from './Tabs.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import Select from '@/components/ui/Select';
import { useTranslations } from 'next-intl';

export type ConfigItem = { tabIndex: number; value: string; label: string };

type TabsProps = {
  config: ConfigItem[];
  renderHeader?: (title: string) => React.ReactNode;
  renderContent: (activeTab: number) => React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({
  renderContent,
  renderHeader,
  config,
}) => {
  const t = useTranslations('FAQ');
  const [activeTab, setActiveTab] = useState<number>(config[0].tabIndex);

  const translatedConfig = useMemo(
    () =>
      config.map((item) => ({
        ...item,
        label: t(item.label),
      })),
    [config, t]
  );

  return (
    <>
      <div className={styles.mobileNavigation}>
        <Select
          data={translatedConfig}
          value={translatedConfig[activeTab]}
          placeholder={t(config[activeTab]?.label)}
          onChange={({ tabIndex }) => setActiveTab(Number(tabIndex))}
        />
      </div>
      <div className={styles.tabBar}>
        {config.map((item, index) => (
          <button
            key={index}
            className={
              renderHeader
                ? ''
                : `${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`
            }
            onClick={() => setActiveTab(index)}
          >
            {renderHeader?.(item.label) || (
              <Typography variant="semiBold14" text={t(item.label)} />
            )}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{renderContent(activeTab)}</div>
    </>
  );
};
