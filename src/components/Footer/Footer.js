import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>The Devs</li>
        <hr />
        <li>
          <a
            href="https://www.linkedin.com/in/richard-carmen-scott/"
            target={'_blank'}
          >
            @Rich
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/mark-j-force/" target={'_blank'}>
            @Mark
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/devonreihl/" target={'_blank'}>
            @Devon
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/will-zeiher/" target={'_blank'}>
            @Will
          </a>
        </li>
      </ul>
    </footer>
  );
}
