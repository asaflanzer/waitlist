const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('basic').readOwn('status').deleteOwn('status');

  ac.grant('supervisor')
    .extend('basic')
    .readAny('status')
    .updateAny('status')
    .deleteAny('status');

  ac.grant('admin').extend('basic').extend('supervisor');

  return ac;
})();
