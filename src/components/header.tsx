import Cart from "./cart";

export default function Header({ onClickCart }: { onClickCart: () => void }) {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="/" draggable={false}>
          <span className="sr-only">Home</span>
          <img
            className="pointer-events-none"
            src={process.env.PUBLIC_URL + "/assets/dh-logo.svg"}
            alt="logo"
          />
        </a>
        <Cart onClickCart={onClickCart} />
      </div>
    </header>
  );
}
