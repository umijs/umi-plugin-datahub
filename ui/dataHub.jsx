import React from 'react';
import { Spin } from 'antd';
import styles from './dataHub.module.less';


const DataHub = props => {
  const { callRemote, getLocale } = props.api;
  const [port, setPort] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getPort = async () => {
      const { port } = await callRemote({
        type: 'org.umi.datahub.getPort',
      })
      setPort(port);
    }
    getPort();
  }, []);

  const onIframeReady = () => {
    setLoading(false);
  }

  const locale = getLocale();

  return (
    <div className={styles.spin} style={{ height: '100%' }}>
      <Spin spinning={loading}>
        {port &&
          <iframe onLoad={onIframeReady} src={`http://127.0.0.1:${port}/dashboard?locale=${locale}`} width="100%" height="100%" frameBorder="0"></iframe>
        }
     </Spin>
    </div>
  );
};

export default DataHub;
