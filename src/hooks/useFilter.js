import React, { useCallback, useState } from 'react';

const useFilters = (data, filters, Option) => {
  const [selected, setSelected] = useState();
  const [state] = useState(filters ?? []);
  const [sortedData, setSortedData] = useState(data);


  const doFilter = useCallback(
    (id) => {
      const filter = state?.filter(item => item?.id === id)[0];
      if (filter) {
        const { comparator } = filter;
        if (comparator) {
          const sorted = sortedData?.sort(comparator) ?? [];
          setSortedData([...sorted]);
        }
      }
    },
    [sortedData, state],
  )

  const sortData = useCallback((index) => {
    const { comparator } = state?.[index];
    if (comparator) {
      const sorted = sortedData?.sort(comparator) ?? [];
      setSortedData([...sorted]);
    }
  }, [sortedData, state]);

  const renderFilters = useCallback(
    () => (
      <div>
        {filters?.map((item, index) =>
          <Option
              text={item?.text}
              lightTheme={selected !== index}
              selected={selected === index}
              onClick={() => {
                setSelected(index);
                sortData(index);
              }}
            key={index?.toString()}
            />)}
       
      </div>
    ),
    [filters, selected, sortData],
  );


  return { renderFilters, sortedData, setInitailData: setSortedData, doFilter };
};

export default useFilters;
