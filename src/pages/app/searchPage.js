import { Badge, Input } from 'components';
import React from 'react';

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
  return (
    <div className="container">
      <SearchBar />
      <Filters />
      <PagingOptions />
    </div>
  );
};

export default SearchPage;
