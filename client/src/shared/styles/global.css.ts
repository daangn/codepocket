import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body, #root', {
  margin: 0,
  padding: 0,
  height: '100%',
});

globalStyle('body', {
  lineHeight: '1.3',
});

globalStyle(
  'html, body, div, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, em, img, ins, kbd, q, s, samp, small, strike, strong, article, footer, header,main,nav, section',
  {
    margin: '0',
    padding: '0',
    border: '0',
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    fontFamily:
      '-apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  },
);

globalStyle(
  'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section',
  {
    display: 'block',
  },
);

globalStyle('ol, ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  wordBreak: 'keep-all',
  whiteSpace: 'pre-wrap',
  letterSpacing: '-0.02em',
  lineHeight: '1.3',
});

globalStyle('span', {
  wordBreak: 'keep-all',
  whiteSpace: 'pre',
  letterSpacing: '-0.02em',
  lineHeight: '1.3',
});

globalStyle('*, *:after, *:before', {
  boxSizing: 'border-box',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});
