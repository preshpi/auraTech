import { useQuery } from "react-query";
import { getSoloProduct } from "../../../sanity/sanity.query";
import SoloContent from "./SoloContent";
import { useParams } from "react-router-dom";
import { SoloContentSkeleton } from "./SkeletonLoader";

const ProductDetails = () => {
  const { id } = useParams();

  const { data: soloProductData, isLoading } = useQuery(
    ["soloProduct", id],
    () => getSoloProduct(id)
  );

  if (isLoading) {
    return <SoloContentSkeleton />;
  }

  return (
    <SoloContent soloProductData={soloProductData} isLoading={isLoading} />
  );
};

export default ProductDetails;
