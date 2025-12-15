import { BsFingerprint } from "react-icons/bs";
import { MdSpatialTracking } from "react-icons/md";

import MenuItem from "./MenuItem";
const CustomerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem
        icon={MdSpatialTracking}
        label="Track Orders"
        address="track-order"
      />
    </>
  );
};

export default CustomerMenu;
