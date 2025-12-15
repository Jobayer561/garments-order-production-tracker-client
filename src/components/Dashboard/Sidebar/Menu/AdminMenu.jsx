import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { FaBoxOpen } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaBoxOpen} label="All Products" address="all-products" />
      <MenuItem
        icon={FaClipboardList}
        label="All Orders"
        address="all-orders"
      />
    </>
  );
};

export default AdminMenu;
