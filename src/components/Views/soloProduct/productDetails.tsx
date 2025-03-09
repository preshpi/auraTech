import { useQuery } from "react-query";
import { getSoloProduct } from "../../../sanity/sanity.query";
import SoloContent from "./SoloContent";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data: soloProductData } = useQuery(["soloProduct", id], () =>
    getSoloProduct(id)
  );
  const categoryName = soloProductData?.categories[0]?.name;

  const { data: similarProductData } = useQuery(
    ["similarProducts", categoryName],
    () => getSoloProduct(categoryName)
  );
  return (
    <SoloContent
      soloProductData={soloProductData}
      similarProductData={similarProductData}
    />
  );
};

export default ProductDetails;
