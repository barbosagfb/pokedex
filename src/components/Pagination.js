import React from 'react';
import '../styles/pagination.css'

export function Pagination (props) {
  const {page,totalPages , previousPage , nextPage} = props;
return (
  <div className="pagination-container">
    <button onClick={previousPage}><div>◀</div></button>
    <div>{page} de {totalPages}</div>
    <button onClick={nextPage}><div>▶</div></button>
  </div>
)}


export default Pagination;