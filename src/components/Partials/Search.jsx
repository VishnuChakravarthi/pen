import React from "react";

const SearchComp = ({ searchKey, setSearchKey }) => {
  return (
    <React.Fragment>
      <li className="d-none d-sm-block">
        <form className="app-search">
          <div className="app-search-box">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn" type="submit">
                  <i className="fe-search"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </li>
    </React.Fragment>
  );
};

export default SearchComp;
