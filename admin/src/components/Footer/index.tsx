import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="@2025 1.0.0 管理中台"
      style={{
        background: 'none',
      }}
      links={[

        {
          key: 'ceap-admin',
          title: 'Ceap Controller',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
