import Container from '@/components/layout/Container';
import styles from './Search.module.css';
import Section from '@/components/layout/Section';
import SearchForm from '@/features/searchForm/ui';
import { Typography } from '@/components/ui/Typography/Typography';

const Search: React.FC = () => (
  <div className={styles.search}>
    <Section>
      <Container>
        <div className={styles.titleWrapper}>
          <Typography tag="h1" variant="h1" text="Find the best flight deals" />
        </div>
        <SearchForm collapsible={false} />
      </Container>
    </Section>
  </div>
);

export default Search;
