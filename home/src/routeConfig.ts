import Home from './components/Home';
import Overview from './components/Overview';

const initialRoute = '/home';
export default () => [
    {
      path: `${initialRoute}/overview`,
      component: Overview,
    },
    {
      path: `${initialRoute}`,
      component: Home,
      // exact: true
    }
  ];