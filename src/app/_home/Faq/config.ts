import { AccordionItem } from '@/components/ui/Accordion/Accordion';
import { ConfigItem } from '@/components/ui/Tabs/Tabs';

export const accordionsConfig: Record<string, AccordionItem[]> = {
  General: [
    {
      title: 'general.bookWithTripcheck.question',
      content: 'general.bookWithTripcheck.answer',
    },
    {
      title: 'general.airlinesDisplayed.question',
      content: 'general.airlinesDisplayed.answer',
    },
    {
      title: 'general.howTripcheckWorks.question',
      content: 'general.howTripcheckWorks.answer',
    },
    {
      title: 'general.extraFees.question',
      content: 'general.extraFees.answer',
    },
    {
      title: 'general.lowCo2Flights.question',
      content: 'general.lowCo2Flights.answer',
    },
  ],
  Tickets: [
    {
      title: 'tickets.afterBooking.question',
      content: 'tickets.afterBooking.answer',
    },
    {
      title: 'tickets.modifyOrRefund.question',
      content: 'tickets.modifyOrRefund.answer',
    },
    {
      title: 'tickets.infantsNeedTicket.question',
      content: 'tickets.infantsNeedTicket.answer',
    },
  ],
  Marketing: [
    {
      title: 'marketing.contactMarketing.question',
      content: 'marketing.contactMarketing.answer',
    },
  ],
};

export const tabsConfig: ConfigItem[] = [
  { tabIndex: 0, label: 'general.title', value: 'General' },
  { tabIndex: 1, label: 'tickets.title', value: 'Tickets' },
  { tabIndex: 2, label: 'marketing.title', value: 'Marketing' },
];
