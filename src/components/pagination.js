import _ from "lodash";
const Pagination = props => {
    const { noOfMovies, pageSize , onPageChange , currentPage } = props;
    const pagesCount = Math.ceil(noOfMovies / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav>
            <ul className="pagination">
                {
                    pages.map(page =>
                        <li key={page} className={page === currentPage ? 'page-item active':'page-item'}>
                            <button 
                                className="page-link"
                                onClick={()=>onPageChange(page)}
                            >{page}</button>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default Pagination;