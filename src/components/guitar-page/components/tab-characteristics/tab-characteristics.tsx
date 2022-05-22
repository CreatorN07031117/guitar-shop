type TabCharacteristicsProps = {
  vendorCode: string,
  type: string,
  stringCount: number,
}

function TabCharacteristics ({vendorCode, type, stringCount }:TabCharacteristicsProps): JSX.Element {
  return (
    <table className="tabs__table">
      <tbody>
        <tr className="tabs__table-row">
          <td className="tabs__title">Артикул:</td>
          <td className="tabs__value">{vendorCode}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Тип:</td>
          <td className="tabs__value">{type}</td>
        </tr>
        <tr className="tabs__table-row">
          <td className="tabs__title">Количество струн:</td>
          <td className="tabs__value">{stringCount} струнная</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TabCharacteristics;
