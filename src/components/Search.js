import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <section>
        <form>
          <label htmlFor="search">
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
            />
          </label>
        </form>
      </section>
    );
  }
}

export default Search;
