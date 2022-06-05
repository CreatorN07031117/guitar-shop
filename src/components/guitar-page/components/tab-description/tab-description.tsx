import style from './tab-description.module.css';
import '../../../app/app.module.css';


type TabDescriptionProps = {
  description: string;
}

function TabDescription ({description}:TabDescriptionProps): JSX.Element {
  return (
    <p className={style.tabsDescription}>{description}</p>
  );
}

export default TabDescription;
