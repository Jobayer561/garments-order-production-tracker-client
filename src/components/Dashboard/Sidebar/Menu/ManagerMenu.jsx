import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlinePendingActions } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import MenuItem from "./MenuItem";
const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Product"
        address="add-product"
      />
      <MenuItem
        icon={MdHomeWork}
        label="Manage Products"
        address="manage-products"
      />
      <MenuItem
        icon={MdOutlinePendingActions}
        label="Pending Orders"
        address="pending-orders"
      />
      <MenuItem
        icon={FaCheckCircle}
        label="Approve Orders"
        address="approve-orders"
      />
    </>
  );
};

export default ManagerMenu;
