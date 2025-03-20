import { Filters } from '@/app/flights/Filters/Filters';
import Search from '@/app/flights/Search/Search';
import { TicketList } from '@/app/flights/TicketList/TicketList';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import styles from './page.module.css';
import { SortTickets } from '@/app/flights/SortTickets/SortTickets';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Flights({ searchParams }: PageProps) {
  const params = await searchParams;

  if (!Object.keys(params).length) {
    redirect('/');
  }

  return (
    <>
      <Search />
      <Section className={styles.pageWrapper}>
        <Container>
          <div className={styles.sectionWrapper}>
            <div className={styles.filterWrapper}>
              <Filters />
            </div>
            <div className={styles.ticketListWrapper}>
              <div className={styles.sortWrapper}>
                <SortTickets />
              </div>
              <TicketList />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
