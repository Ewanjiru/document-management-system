export default {
  documents: { all: [], byId: {} },
  user: [],
  users: { all: [], byId: {} },
  session: !!sessionStorage.token,
  roles: [],
  error: null,
  count: 0,
  search: []
};
