interface PreviousSearchesProps {
  searches: string[];

  onSearchClicked: (term: string) => void;
}

export const PreviousSearches = (props: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
      <h3>Búsquedas previas</h3>

      <ul className="previous-searches-list">
        {props.searches && props.searches.length
          ? props.searches.map((term) => (
              <li key={term} onClick={() => props.onSearchClicked(term)}>
                {term}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
