import { useState, useCallback, useRef } from "react";
import Filter from "components/Filter";
import "./App.css";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "components/footer";
import Header from "components/header";
import CarCard from "components/CarCard";
import useDebounce from "hooks/useDebounce";
import { useGetCar } from "api/carApi";
import { useAtom } from "jotai";
import cartStore from "stores/cartStore";
import CartModal from "components/CartModal";

function App() {
  const [textSearch, setTextSearch] = useState("");
  const [order, setOrder] = useState("fields.price");
  const ref = useRef<HTMLDialogElement>(null);

  const [cartList, setCartList] = useAtom(cartStore);
  const search = useDebounce(textSearch, 500);
  const { data, isLoading } = useGetCar({ order, search });

  const onAddToCart = useCallback(
    (item: any) => {
      const car = {
        id: item?.sys?.id || "",
        ...item?.fields,
        rentDay: 1,
      };
      const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      } as ToastOptions;
      const existsCarIndex = cartList.findIndex((x: any) => x?.id === car?.id);
      if (existsCarIndex >= 0) {
        let tempCartList = [...cartList];
        tempCartList[existsCarIndex] = {
          ...tempCartList[existsCarIndex],
          rentDay: tempCartList[existsCarIndex]?.rentDay,
        };
        setCartList(tempCartList);
        toast(
          `🚗 Added ${tempCartList[existsCarIndex].title} (${
            tempCartList[existsCarIndex]?.rentDay + 1
          } Days)`,
          toastConfig
        );
      } else {
        setCartList([...cartList, car]);
        toast(`🚗 Added ${car?.title} (1 Day)`, toastConfig);
      }
    },
    [cartList, setCartList]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header onClickCart={() => ref.current?.showModal()} />
      <div className="w-full pb-5 pt-8 flex flex-col max-w-screen-xl items-center mx-auto gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full sm:flex-row flex-col">
          <p className="text-3xl text-gray-900 font-semibold place-self-start block">
            Car Available
          </p>
          <Filter
            onChangeSearch={(e) => setTextSearch(e)}
            onChangeSort={(e) => setOrder(e)}
          />
        </div>
      </div>
      <div
        className="bg-gray-100 
      w-full min-h-[calc(100vh_-_315px)] 
      place-content-center 
      pt-5 pb-10 px-5 grid 
      gird-cols-1 
      sm:grid-cols-[repeat(auto-fit,_40%)] 
      md:grid-cols-[repeat(auto-fit,_30%)] 
      lg:grid-cols-[repeat(auto-fit,_20%)]   
      gap-5"
      >
        {isLoading ? (
          <span className="loading loading-bars loading-lg place-self-center" />
        ) : data?.items?.length > 0 ? (
          data?.items?.map((x: any) => (
            <CarCard
              key={x?.sys?.id}
              onAddToCart={() => onAddToCart(x)}
              {...x?.fields}
            />
          ))
        ) : (
          <div className="card w-96 bg-white text-gray-500">
            <div className="card-body">
              <h2>Data Not Found!</h2>
            </div>
          </div>
        )}
      </div>
      <CartModal ref={ref} />
      <ToastContainer />

      <Footer />
    </div>
  );
}

export default App;
