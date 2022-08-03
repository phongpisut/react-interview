import CarList from "../car-list";
import Cart from "../cart";

const Body = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <CarList />
      <Cart />
    </div>
  );
};

export default Body;
