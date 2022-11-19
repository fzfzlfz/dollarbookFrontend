// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_cart'),
  }
  ,{
    title: 'analysis',
    path: '/analysis',
    icon: icon('ic_analytics'),
  },
  {
    title: '$BOOK',
    path: '/dollarbook',
    icon: icon('ic_blog'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  }
];

export default navConfig;
