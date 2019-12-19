import React from 'react';
import { IUiApi } from 'umi-types';
import Test from './Test';

export default (api: IUiApi) => {
  api.addPanel({
    title: 'DataHub',
    path: '/datahub',
    icon: <img width={16} height={16} src="https://macacajs.github.io/macaca-datahub/logo/logo-color.svg" />,
    component: Test,
  });
};
