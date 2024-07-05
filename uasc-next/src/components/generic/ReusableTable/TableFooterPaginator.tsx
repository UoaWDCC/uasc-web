import RightArrow from  "@/assets/icons/rightarrow.svg"
import LeftArrow from  "@/assets/icons/leftarrow.svg"

interface ITableFooterPaginator {
  maxPages: number
  currentPage: number
  onNext?: () => void
  onBack?: () => void
}

const TableFooterPaginator = ({
  maxPages,
  currentPage,
  onNext,
  onBack
}: ITableFooterPaginator) => (
  <>
    <span className="mx-2 flex items-center gap-2">
      <span
        className="fill-gray-4 flex h-[10px] w-[10px] cursor-pointer"
        onClick={onBack}
      >
        <LeftArrow />
      </span>
      <h5 className="select-none font-bold text-black">PAGE</h5>
      <input
        value={currentPage}
        className="border-gray-3 text-h5 h-5 w-6 rounded-md px-0 pl-[4px] text-black"
      />
      <h5 className="text-h5 select-none font-bold text-black">
        OF {maxPages}
      </h5>
      <span
        className="fill-gray-4 flex h-[10px] w-[10px] cursor-pointer"
        onClick={onNext}
      >
        <RightArrow />
      </span>
    </span>
  </>
)

export default TableFooterPaginator
