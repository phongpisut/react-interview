import { atomWithStorage } from "jotai/utils";
const cartStore = atomWithStorage<any>("cart", []);
export default cartStore;
