import './about.scss';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { slugs } from '../../data/config';
import { about } from '../../data/strings';
import Layout from '../components/Layout';
import { AboutImage } from '../types';

export const query = graphql`
  query {
    pike: file(relativePath: { eq: "about/pike_portrait.png" }) {
      ...avatarImage
    }
    QHH: file(relativePath: { eq: "about/QHH_portrait.png" }) {
      ...avatarImage
    }
    oleg2242: file(relativePath: { eq: "about/oleg2242_portrait.png" }) {
      ...avatarImage
    }
    cro: file(relativePath: { eq: "about/cro_portrait.png" }) {
      ...avatarImage
    }
    tsanada: file(relativePath: { eq: "about/tsanada_portrait.png" }) {
      ...avatarImage
    }
    HD: file(relativePath: { eq: "about/HD_portrait.png" }) {
      ...avatarImage
    }
    mad_orc: file(relativePath: { eq: "about/mad_orc_portrait.png" }) {
      ...avatarImage
    }
    myfate: file(relativePath: { eq: "about/myfate_portrait.png" }) {
      ...avatarImage
    }
  }
`;

const About: React.FC<{ data: AboutImage }> = ({ data }) => (
  <Layout title={about.pageTitle} description={about.pageDescription} slug={slugs.about}>
    <p className="about-text">{about.text}</p>
    <section className="contributors">
      <h2>{about.contributorTitle}</h2>
      <ul className="avatars">
        {about.contributors.map((cont, i) => (
          <li key={i} className="contributor">
            <Img
              fixed={data[cont.avatar as keyof AboutImage].childImageSharp.fixed}
              alt={about.avatarAlt({ name: cont.name })}
              fadeIn={false}
            />
            <p>{cont.name}</p>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default About;
