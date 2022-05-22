type TabDescriptionProps = {
  description: string;
}

function TabDescription ({description}:TabDescriptionProps): JSX.Element {
  return (
    <p className="tabs__product-description">{description}</p>
  );
}

export default TabDescription;
