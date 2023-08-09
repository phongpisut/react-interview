import { useAtom } from "jotai";
import cartStore from "stores/cartStore";

type Props = {
  onClickCart: () => void;
};

export default function Cart({ onClickCart }: Props) {
  const [cartList] = useAtom(cartStore);

  return (
    <div className="ml-auto">
      <button className="ml-auto flex" onClick={onClickCart}>
        <div className="relative">
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
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          {cartList.length > 0 && (
            <span className="whitespace-nowrap rounded-full w-3 h-3 text-sm bg-red-500 absolute -top-1 -right-1" />
          )}
        </div>

        <p className="ml-2 font-semibold text-gray-900">
          Cart ({cartList.length})
        </p>
      </button>
    </div>
  );
}
