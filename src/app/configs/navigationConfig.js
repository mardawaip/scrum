import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards.project',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:clipboard-check',
    url: '/dashboards',
  },
  {
    id: 'apps.calendar',
    title: 'Calendar',
    subtitle: '3 upcoming events',
    type: 'item',
    icon: 'heroicons-outline:calendar',
    url: '/calendar',
    translate: 'CALENDAR',
  },
  {
    id: 'apps.scrumboard',
    title: 'Scrumboard',
    type: 'item',
    icon: 'heroicons-outline:view-boards',
    url: '/scrumboard',
    translate: 'SCRUMBOARD',
  },
  // {
  //   id: 'apps.tasks',
  //   title: 'Tasks',
  //   subtitle: '12 remaining tasks',
  //   type: 'item',
  //   icon: 'heroicons-outline:check-circle',
  //   url: '/tasks',
  //   translate: 'TASKS',
  // },
  {
    id: 'apps.contacts',
    title: 'Pengguna',
    type: 'item',
    icon: 'heroicons-outline:user-group',
    url: '/contacts',
    translate: 'Pengguna',
  },
  {
    id: 'apps.profile',
    title: 'Profile',
    type: 'item',
    icon: 'heroicons-outline:user-circle',
    url: '/profile',
  },
];

export default navigationConfig;
