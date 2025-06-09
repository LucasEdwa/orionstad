import { Link } from "react-router";
export const NotFound = () => {
  return (<div className=''>
    <h1>404 Not Found</h1>
  <p>The page you are looking for does not exist.</p>
  <Link className=""to="/">Go back to the home page</Link>
  </div>);
}