import { Link } from 'react-router';
import ThemeSelector from './themeSelector';

const Header = () => {
  return (
    <>
      <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <ThemeSelector />
      </div>
    </>
  );
};

export default Header;
