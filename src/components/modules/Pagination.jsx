import React, { useState } from 'react'
import styles from './Pagination.module.css';
import { FaAngleDoubleUp } from "react-icons/fa";

function Pagination({page, setPage}) {
  
  const topHandler=()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
  const prevHandler = () => {
    if (page === 1) return;
    setPage(page => page - 1);
  }

  const nextHandler = () => {
    if (page === 10) return;
    setPage(page => page + 1);
  }

  const numHandler = (number) => {
    setPage(number);
  }

  return (
    <div className={styles.pagination}>
      <button className={page===1 ? styles.disabled : null} onClick={prevHandler}>prev</button>
      <p className={page === 1 ? styles.selected : null} onClick={() => numHandler(1)}>1</p>
      <p className={page === 2 ? styles.selected : null} onClick={() => numHandler(2)}>2</p>
      {
        page > 2 && page < 9 && (
          <>
            <span> ... </span>
            <p className={styles.selected} onClick={() => numHandler(page)}>{page}</p>

          </>
        )
      }
      <span> ... </span>
      <p className={page === 9 ? styles.selected : null} onClick={() => numHandler(9)}>9</p>
      <p className={page === 10 ? styles.selected : null} onClick={() => numHandler(10)}>10</p>
      <button className={page===10 ? styles.disabled : null} onClick={nextHandler}>next</button>
      <FaAngleDoubleUp style={{cursor:"pointer"}} onClick={topHandler}/>
    </div>
  )

 
}

export default Pagination
