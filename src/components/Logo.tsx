import React from 'react';

import logo from "../assets/logo.svg"
// A simple SVG logo representing the initials "JR" inside a circle.
// The `currentColor` fill allows the logo to inherit text color from its
// parent, making it easy to style with Tailwind utility classes.

export const Logo: React.FC<React.HTMLAttributes<SVGElement>> = ({ className }) => (
  <figure>
    <img src={logo} alt="Brand Logo" className={className} />
    <figcaption>Brand Logo</figcaption>
  </figure>
);
