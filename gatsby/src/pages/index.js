import React from 'react';
import SEO from '../components/SEO';
import useLatestData from '../utils/useLatestData';
import ItemGrid from '../components/ItemGrid';

import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is worrking now!</p>}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices!</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>No one is worrking now!</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  return (
    <>
      <SEO title="Home Page" />
      <div className="center">
        <h1>The Best Pizza</h1>
        <p>Open 11a, to 11p, Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
