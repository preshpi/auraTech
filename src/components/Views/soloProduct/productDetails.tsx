import { useQuery } from "react-query";
import { getSoloProduct } from "../../../sanity/sanity.query";
import SoloContent from "./SoloContent";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data: soloProductData, isLoading } = useQuery(
    ["soloProduct", id],
    () => getSoloProduct(id)
  );

  return (
    <SoloContent soloProductData={soloProductData} isLoading={isLoading} />
  );
};

export default ProductDetails;
