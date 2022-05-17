const ListGroup = props => {
    const { genres, onGenreSelect , selectedGenre , name , id } = props;
    return (
        <ul className="list-group">
            {genres.map(genre =>
                <li
                    key={genre[id]}
                    className={selectedGenre === genre ? "list-group-item active" : "list-group-item"}
                    onClick={()=>onGenreSelect(genre)}
                >{genre[name]}</li>
            )}
        </ul>
    );
}

ListGroup.defaultProps = {
    name : 'name',
    id : '_id'
}
export default ListGroup;