import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';

const contactsDB = mockApi.components.examples.contacts.value;
const tagsDB = mockApi.components.examples.contacts_tags.value;

mock.onGet('/api/pengguna').reply((config) => {
  return [200, contactsDB];
});

mock.onPost('/api/pengguna').reply(({ data }) => {
  const newContact = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };

  contactsDB.push(newContact);

  return [200, newContact];
});

mock.onGet(/\/api\/pengguna\/(?!tags)[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/pengguna\/(?<id>[^/]+)/).groups;
  const contact = _.find(contactsDB, { id });

  if (contact) {
    return [200, contact];
  }

  return [404, 'Requested task do not exist.'];
});

mock.onPut(/\/api\/pengguna\/[^/]+/).reply(({ url, data }) => {
  const { id } = url.match(/\/api\/pengguna\/(?<id>[^/]+)/).groups;

  _.assign(_.find(contactsDB, { id }), JSON.parse(data));

  return [200, _.find(contactsDB, { id })];
});

mock.onDelete(/\/api\/pengguna\/[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/pengguna\/(?<id>[^/]+)/).groups;

  _.remove(contactsDB, { id });

  return [200, id];
});

mock.onGet('/api/pengguna/tags').reply((config) => {
  return [200, tagsDB];
});
