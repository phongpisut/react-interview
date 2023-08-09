import React, { useCallback, useState, useEffect } from "react";
import { useAtom } from "jotai";
import cartStore from "stores/cartStore";
import { useGetDiscount } from "api/carApi";
import ImgFallBack from "components/ImgFallBack";

const CartModal = React.forwardRef(
  (props, ref: React.LegacyRef<HTMLDialogElement>) => {
    const [cartList, setCartList] = useAtom(cartStore);
    const [total, setTotal] = useState(0);
    const [searchDiscount, setSearchDiscount] = useState<string | undefined>();
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const { data, mutate, isLoading } = useGetDiscount();

    const onIncrease = useCallback(
      async (index: number) => {
        let tempCartList = [...cartList];
        tempCartList[index] = {
          ...tempCartList[index],
          rentDay: tempCartList[index]?.rentDay + 1,
        };
        await new Promise((r) => setTimeout(r, 100));
        await setCartList(tempCartList);
      },
      [cartList, setCartList]
    );

    const onDecrease = useCallback(
      async (index: number) => {
        let tempCartList = [...cartList];
        const rentDay = tempCartList[index]?.rentDay;
        if (rentDay > 1) {
          tempCartList[index] = {
            ...tempCartList[index],
            rentDay: rentDay - 1,
          };
        } else {
          tempCartList = tempCartList.filter(
            (x) => x?.id !== tempCartList[index]?.id
          );
        }

        await new Promise((r) => setTimeout(r, 100));
        await setCartList(tempCartList);
      },
      [cartList, setCartList]
    );

    useEffect(() => {
      setTotal(
        cartList?.reduce?.((acc: any, curr: any) => {
          return acc + curr?.rentDay * +curr?.price;
        }, 0)
      );
    }, [cartList]);

    useEffect(() => {
      const getDiscount = setTimeout(() => {
        searchDiscount !== undefined && mutate(searchDiscount || "");
      }, 500);
      return () => clearTimeout(getDiscount);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDiscount]);

    useEffect(() => {
      if (data?.items?.length > 0) {
        setDiscount(data?.items?.[0]?.fields?.amount || 0);
      } else {
        setDiscount(0);
      }
    }, [data]);

    useEffect(() => {
      setGrandTotal(discount > total ? 0 : total - discount);
    }, [discount, total]);

    return (
      <dialog ref={ref} className="modal">
        <form method="dialog" className="modal-box pt-0 px-0">
          <div className="modal-action mt-0 pt-3 px-4">
            <p className="font-semibold text-2xl text-gray-900 mr-auto">Cart</p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="Black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto p-5 max-h-[50vh] mt-4 px-4">
            {cartList?.length > 0 ? (
              cartList?.map((x: any, i: number) => (
                <div key={x?.id}>
                  <div className="flex">
                    <ImgFallBack
                      fallback={
                        process.env.PUBLIC_URL + "/assets/photo-icon.svg"
                      }
                      fallbackClassName="w-20 hidden sm:flex bg-gray-300 p-5 rounded-sm"
                      src={x?.photo}
                      alt=""
                      className="w-20 hidden sm:flex rounded-sm"
                    />
                    <div className="flex flex-col px-2">
                      <b>{x?.title}</b>
                      <p>{x?.price?.toLocaleString?.()} THB/Day</p>
                    </div>
                    <div className="ml-auto flex flex-row place-self-center">
                      <button
                        type="button"
                        onClick={() => onIncrease(i)}
                        className="btn border-0 btn-square btn-sm bg-blue-500 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-plus"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <p className="px-4 font-semibold place-self-center text-xl">
                        {x?.rentDay}
                      </p>
                      <button
                        type="button"
                        onClick={() => onDecrease(i)}
                        className="btn border-0 btn-square btn-sm bg-blue-500 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-minus"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="divider" />
                </div>
              ))
            ) : (
              <div>The Cart is empty</div>
            )}
          </div>
          <div className="bg-gray-200 w-full px-5 py-2 mb-5">
            <input
              type="text"
              placeholder="Discount code"
              className="input input-bordered w-full rounded-md "
              onChange={(e) => setSearchDiscount(e.target?.value)}
            />
          </div>
          <div className="px-4">
            <div className="flex place-items-center">
              <b className="text-lg">Total</b>
              <p className="ml-auto text-lg font-medium">
                {total?.toLocaleString?.()} THB
              </p>
            </div>
            <div className="divider mt-0" />
            <div className="flex place-items-center">
              <b className="text-lg">Discount</b>
              <p className="ml-auto text-lg font-medium">
                {discount?.toLocaleString?.()} THB
              </p>
            </div>
            <div className="divider mt-0" />
            <div className="flex place-items-center">
              <b className="text-lg">Grand Total</b>
              <p className="ml-auto text-lg font-medium">
                {grandTotal?.toLocaleString?.()} THB
              </p>
            </div>
          </div>
        </form>
      </dialog>
    );
  }
);

export default CartModal;
