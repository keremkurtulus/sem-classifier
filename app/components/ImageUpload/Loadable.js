/**
 *
 * Asynchronously loads the component for ImageUpload
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
