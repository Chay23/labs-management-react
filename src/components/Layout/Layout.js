import Nav from '../Nav/Nav';

const Layout = props => (
  <>
    <Nav />
    <main>{props.children}</main>
  </>
);

export default Layout;
