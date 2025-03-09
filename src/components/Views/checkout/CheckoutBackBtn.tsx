import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CheckoutBackBtn = () => {
  // HOOKS
  const router = useNavigate();

  return (
    <div className="pt-10">
      <button className="flex item-center gap-3" onClick={() => router(-1)}>
        <span className=" my-auto">
          <GoArrowLeft />
        </span>
        Go back
      </button>
    </div>
  );
};

export default CheckoutBackBtn;
