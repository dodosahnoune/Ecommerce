import { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import { ProductProps } from "../../type";

interface ItemsProps {
  currentItems: ProductProps[];
}

interface PaginationProps {
  items: ProductProps[];
  itemsPerPage: number;
}

function Items({ currentItems }: ItemsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {currentItems &&
        currentItems.map((item: ProductProps) => (
          <ProductCard key={item._id} item={item} />
        ))}
    </div>
  );
}

const Pagination = ({ items, itemsPerPage }: PaginationProps) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const safeItems = Array.isArray(items) ? items : [];

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = safeItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(safeItems.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % safeItems.length;
    const newStart = newOffset + 1;
    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, safeItems.length)} of{" "}
          {safeItems.length}
        </p>
      </div>
    </>
  );
};

export default Pagination;
