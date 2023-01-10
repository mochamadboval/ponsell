export default function LoadMore(props) {
  const { isAllLoaded, loadMore } = props;

  return (
    <div className="pb-5 px-4 text-center">
      {!isAllLoaded ? (
        <button
          className="bg-green-700 px-6 py-3 rounded-md shadow-sm text-white"
          onClick={loadMore}
        >
          Load more
        </button>
      ) : (
        <p>All products are loaded.</p>
      )}
    </div>
  );
}
