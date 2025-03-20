'use client';

import React, { useRef, useState } from 'react';
import styles from './Accordion.module.css';

export type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  config: AccordionItem[];
  defaultOpenIndex?: number;
  renderHeader: (
    title: string,
    isOpen: boolean,
    cb: () => void,
    accordionNumber?: number
  ) => React.ReactNode;
  renderContent: (content: string, index?: number) => React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  config,
  defaultOpenIndex = 0,
  renderHeader,
  renderContent,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    defaultOpenIndex
  );

  const heights = useRef<{ [key: PropertyKey]: number }>({});

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {config.map(({ title, content }, index) => {
        const isOpen = activeIndex === index;
        const height = isOpen ? heights.current[index] : '0px';
        const accordionNumber = index + 1;

        return (
          <div key={title + index}>
            {renderHeader(
              title,
              isOpen,
              () => handleToggle(index),
              accordionNumber
            )}

            <div
              className={`${styles.accordionContent} ${isOpen ? styles.active : ''}`}
              ref={(el) => {
                if (el != null) {
                  if (activeIndex === index) {
                    el.style.height = el.scrollHeight + 'px';
                  }
                  heights.current[index] = el.scrollHeight;
                }
              }}
              style={{ height }}
            >
              {renderContent(content, index)}
            </div>
          </div>
        );
      })}
    </>
  );
};
