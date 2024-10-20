import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    /*
  <a href="#" className="search-button">
    <FontAwesomeIcon icon={faSearch} className="search" />
  </a>
  */
    <>
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {/* aca arranca el primer modal */}
      <div className="modal" id="modal_search" tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                       
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default SearchBar;
