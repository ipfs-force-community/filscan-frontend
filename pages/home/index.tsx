import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { apiUrl } from '@/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Meta from '@/src/home/meta'
import fetchData from '@/store/server';


type HomeProps = {
  home_meta: any
}
 
export const getServerSideProps = async () => {
  const home_meta = await fetchData(apiUrl.home_meta);
  console.log('---3',home_meta)
   return { props: { home_meta } }

}



function Home(props:any) {
    const { tr } = Translation({ns:'home'});
  console.log('---3',props,apiUrl.home_meta)
  return <div>
    <h1>{tr('meta_title')}</h1>
    <Meta data={{}}/>
  </div>;
}

export default Home;


 

