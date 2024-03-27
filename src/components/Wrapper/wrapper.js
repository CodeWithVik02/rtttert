import { useParams } from 'react-router-dom';

export default function ProductWrapper({Product}){
  const { id } = useParams();
  return <Product id={id} />
};
