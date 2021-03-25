import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img: {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: var(--grey);
  }
`;

export default function BeersPages({ data }) {
  const beers = data.beers.nodes;
  return (
    <div>
      <SEO title={`Beers! We have ${beers.length}`} />
      <h2 className="center">We have {beers.length} avalible. Dine in Only</h2>
      <BeerGridStyle>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`🌟`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`🌟`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyle>
    </div>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        image
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
