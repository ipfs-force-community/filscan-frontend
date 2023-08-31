import styles from './style.module.scss';
import { observer } from 'mobx-react';
import { Carousel } from 'antd';

const Banner = (props: any)=> {
  return <div className={styles.banner}>
    <Carousel>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  </div>;
}

export default observer(Banner);
