import { useParams } from "react-router-dom";

const CategoryScreen = () => {
  const params = useParams();
  return <p>Category is {params.cat}</p>;
};

export default CategoryScreen;
