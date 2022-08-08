const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
            find countries <input onChange={handleFilterChange} value={filter} />
        </div>
    )
}

export default Filter