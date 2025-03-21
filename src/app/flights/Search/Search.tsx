import Container from '@/components/layout/Container';
import styles from './Search.module.css';
import SearchForm from '@/features/searchForm/ui';

const Search: React.FC = () => (
  <div className={styles.search}>
    <Container>
      <SearchForm initiallyCollapsed />
    </Container>
  </div>
);

export default Search;
