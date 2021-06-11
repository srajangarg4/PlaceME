import { Badge, Input, Modal } from 'components';
import React, { useState } from 'react';

const SearchBar = () => (
  <div className="row">
    <div className="col-12">
      <Input onChange={(text) => console.log(text)} placeholder="Search Here" />
    </div>
  </div>
);

const Filters = () => (
  <div>
    {[...Array(4)].map((_, index) => (
      <Badge
        text={index.toString()}
        key={index.toString()}
        onClick={() => console.log('Hua kuch')}
        selected
      />
    ))}
  </div>
);

const PagingOptions = () => <div></div>;

const SearchPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="container">
      <SearchBar />
      <Filters />
      <PagingOptions />
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      <Modal
        show={show}
        onSelected={() => {
          console.log('Pressed');
          setShow(!setShow);
        }}
      >
        <h2>Hello</h2>
      </Modal>
    </div>
  );
};

export default SearchPage;
