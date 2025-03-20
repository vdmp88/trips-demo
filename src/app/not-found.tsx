import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import styles from './not-found.module.css';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className={styles.imageWrapper}>
          <Image src="/svg/404.svg" alt="404" width={1250} height={465} />
        </div>
        <div className={styles.titleWrapper}>
          <Typography
            tag="h3"
            variant="h3"
            text="Oops, we can't seem to find the page you're looking for."
          />
        </div>
        <div className={styles.descriptionWrapper}>
          <Typography
            tag="p"
            variant="medium16"
            text="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button href="/">Back to home page</Button>
        </div>
      </Container>
    </Section>
  );
}
