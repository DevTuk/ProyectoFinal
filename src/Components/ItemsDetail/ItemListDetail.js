import ItemDetail from './ItemDetail';

const ItemListDetail = ({ detail }) => {
  return (
    <>
      {detail.map((detail) => (
        <ItemDetail key={detail.id} {...detail} />
      ))}
    </>
  );
};

export default ItemListDetail;
