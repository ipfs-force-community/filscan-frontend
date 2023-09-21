import styles from "./index.module.scss";

export default ({ text}:{text?:string}) => {
  return <div className={styles.noData}>
    { text || 'No Data'}
  </div>
}