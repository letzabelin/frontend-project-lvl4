// @ts-check

import { createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter({
  selectId: (message) => message.id,
  sortComparer: (a, b) => a.id - b.id,
});

export default adapter;
