export default function SortProduct(props) {
  const { selectValue, sort } = props;

  return (
    <div className="flex items-center justify-end px-4 pt-5">
      <p className="mr-2">Sorted by</p>
      <select
        className="bg-white p-3 rounded-md shadow-sm"
        value={selectValue}
        onChange={sort}
      >
        <option value="high">Price: High to low</option>
        <option value="low">Price: Low to high</option>
        <option value="date">Release date</option>
      </select>
    </div>
  );
}
