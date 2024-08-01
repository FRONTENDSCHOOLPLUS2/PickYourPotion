import CartIcon from "./icons/CartIcon";

function CartButton() {
  return (
    <button
      type="button"
      className="absolute bottom-3 flex justify-center items-center right-3 w-12 h-12 bg-primary rounded-full overflow-hidden cursor-pointer"
    >
      <CartIcon className="fill-white" />
      <span className="a11y-hidden">술바구니에 담기</span>
    </button>
  );
}

export default CartButton;
