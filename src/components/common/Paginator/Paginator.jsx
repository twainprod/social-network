import React from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

let Paginator = React.memo(({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  onPortionChanged,
  portionSize = 10,
  portionNumber
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  
  return (
    <div className={s.pagesBlock}>
      {portionNumber > 1 && (
        <button
          className={s.buttonPrev}
          onClick={() => {
            onPortionChanged(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              key={p}
              onClick={(e) => {
                onPageChanged(p, portionNumber);
              }}
              className={cn({ [s.selectedPage]: currentPage === p }, s.pages)}
              // Использование библиотеки classNames (cn) позволяет применять несколько классов к элементу через запятую.
              // {[s.selectedPage]: currentPage === p} - добавить класс s.selectedPage, при условии, что currentPage === p.
              // Класс s.pages будет применяться всегда.
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button className={s.buttonNext}
          onClick={() => {
            onPortionChanged(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
});

export default Paginator;
