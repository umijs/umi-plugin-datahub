import React from 'react';
import { IUiApi } from 'umi-types';
import DataHub from './dataHub';

export default (api: IUiApi) => {
  api.addPanel({
    title: 'DataHub',
    path: '/datahub',
    icon: <img style={{ marginRight: api.mini ? 0 : 10 }} width={16} height={16} src="https://macacajs.github.io/macaca-datahub/logo/logo-color.svg" />,
    component: () => <DataHub api={api} />,
    headerTitle: <div />,
  });
};
