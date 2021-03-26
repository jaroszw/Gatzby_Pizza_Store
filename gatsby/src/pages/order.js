import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import fromatMoney from '../utils/formateMoney';
import OrderStyles from '../styles/OrderStyles';
import ManuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;

  return (
    <div>
      <SEO title="Order a Pizza!" />
      <OrderStyles action="Order a Pizza">
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>

        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <ManuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div className="btn">
                {['S', 'M', 'L'].map((size) => (
                  <div>
                    <button type="button">
                      {size}
                      {fromatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  </div>
                ))}
              </div>
            </ManuItemStyles>
          ))}
        </fieldset>

        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </OrderStyles>
    </div>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        toppings {
          name
          id
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
