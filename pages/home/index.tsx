import { Translation }  from '@/components/hooks/Translation'

function Home() {
    const { tr } = Translation({ns:'home'});

  return <h1>{tr('meta_title')}</h1>;
}

export default Home;
