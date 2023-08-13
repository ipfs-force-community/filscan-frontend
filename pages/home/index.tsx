//import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { apiUrl } from '@/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Banner from '@/components/banner';
import Meta from '@/src/home/meta'
import Gas from '@/src/statistics/Gas'

//import fetchData from '@/store/server';


// type HomeProps = {
//   home_meta: any
// }
 
// export const getServerSideProps = async () => {
//   const home_meta = await fetchData(apiUrl.home_meta);
//   console.log('---3',home_meta)
//    return { props: { home_meta } }

// }



function Home(props:any) {
    const { tr } = Translation({ns:'home'});
  console.log('---3',props,apiUrl.home_meta)
  return <>
     <Banner />
    <div className='main_contain bg-bgColor'>
    <div className='flex justify-between'>
      <Meta />
      <div className="border card_shadow w-[403px] h-[270px] rounded-xl">
        <Gas origin='home'/>
      </div>
    </div>
  </div>
  </>
           

  ;
}

export default Home;


 

