type Props = {
  onChangeSearch: (e: string) => void;
  onChangeSort: (e: string) => void;
};

export default function Filter({ onChangeSearch, onChangeSort }: Props) {
  return (
    <div className="sm:ml-auto sm:mt-0 mt-4 flex sm:flex-row flex-col gap-3">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full rounded-md sm:min-w-[20vw]"
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <div className="relative flex border-gray-200 border-2 rounded-md">
        <img
          className="absolute top-3 left-3 z-10"
          src={process.env.PUBLIC_URL + "/assets/sort.svg"}
          alt="sort"
        />
        <select
          className="select select-ghost w-full rounded-md focus:outline-none relative pl-10 min-w-fit"
          onChange={(e) => onChangeSort(e.target.value)}
        >
          <option value={"fields.price"}>Price : Low-High</option>
          <option value={"-fields.price"}>Price : High-Low</option>
          <option value={"fields.title"}>Name : A-Z</option>
          <option value={"-fields.title"}>Name : Z-A</option>
        </select>
      </div>
    </div>
  );
}
