import style from './tab-characteristics.module.css';
import '../../../app/app.module.css';


type TabCharacteristicsProps = {
  vendorCode: string,
  type: string,
  stringCount: number,
}

function TabCharacteristics({vendorCode, type, stringCount }:TabCharacteristicsProps): JSX.Element {
  return (
    <table className={style.tabsTable }>
      <tbody>
        <tr className={style.tabsTableRow}>
          <td className={style.tabsTitle}>Артикул:</td>
          <td className={style.tabsValue}>{vendorCode}</td>
        </tr>
        <tr className={style.tabsTableRow}>
          <td className={style.tabsTitle}>Тип:</td>
          <td className={style.tabsValue}>{type}</td>
        </tr>
        <tr className={style.tabsTableRow}>
          <td className={style.tabsTitle}>Количество струн:</td>
          <td className={style.tabsValue}>{stringCount} струнная</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabCharacteristics;
