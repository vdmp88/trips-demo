import Search from '@/app/_home/Search';
import Container from '@/components/layout/Container';
import { MainBanner } from '@/app/_home/MainBanner/MainBanner';
import { Faq } from '@/app/_home/Faq/Faq';
import Section from '@/components/layout/Section';
// import { useTranslations } from 'next-intl';
export default function Home() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Search />
      <Container>
        <Section className="main-banner">
          <MainBanner />
        </Section>
        <Section>
          <Faq />
        </Section>
      </Container>
    </>
  );
}
