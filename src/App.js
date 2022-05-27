import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(process.env.appId, process.env.apiKey);

class App extends Component {
  render() {
    const imgUrl = require('./Algolia-logo.png');
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">Baeldung Newsletter Search</a>
          </h1>
          <p className="header-subtitle">
            {/* <a href="https://github.com/algolia/react-instantsearch">
              Powered by Algolia 👍
            </a> */}
            <img src={imgUrl} alt="Powered by Algolia" />
          </p>
        </header>
        {/* <PoweredBy /> */}
        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="newsletter">
            <div className="search-panel">
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: 'Search for Tags like AWS, Kafka, Spring',
                  }}
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <article>
      <div className="week">
        <span>{props.hit.week}</span>
      </div>
      <div className="content">
        <a
          rel="noopener noreferrer"
          href={`https://baeldung.com/java-weekly-${props.hit.week}`}
          target="_blank"
        >
          {props.hit.title}
        </a>
        <h1>
          <Highlight attribute="tags" hit={props.hit} />
        </h1>
      </div>
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
