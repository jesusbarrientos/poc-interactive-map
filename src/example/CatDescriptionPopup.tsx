import styles from './CatDescriptionPopup.module.scss';

type Props = {
  data?: {
    id: string;
    name: string;
  }
}

export const CatDescriptionPopup = ({ data }: Props) => {
  if (!data) return null;

  return (
    <div className={styles.catDescriptionPopup}>
      <h1>{data.name}</h1>
      <span>ID: {data.id}</span>
    </div>
  )
}