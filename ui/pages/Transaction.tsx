import { useRouter } from 'next/router';
import React from 'react';

import type { RoutedTab } from 'ui/shared/Tabs/types';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { useAppContext } from 'lib/contexts/app';
import getQueryParamString from 'lib/router/getQueryParamString';
import { TX } from 'stubs/tx';
import AccountActionsMenu from 'ui/shared/AccountActionsMenu/AccountActionsMenu';
import TextAd from 'ui/shared/ad/TextAd';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import EntityTags from 'ui/shared/EntityTags';
import NetworkExplorers from 'ui/shared/NetworkExplorers';
import PageTitle from 'ui/shared/Page/PageTitle';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import useTabIndexFromQuery from 'ui/shared/Tabs/useTabIndexFromQuery';
import TxDetails from 'ui/tx/TxDetails';
import TxDetailsWrapped from 'ui/tx/TxDetailsWrapped';
import TxInternals from 'ui/tx/TxInternals';
import TxLogs from 'ui/tx/TxLogs';
import TxRawTrace from 'ui/tx/TxRawTrace';
import TxState from 'ui/tx/TxState';
import TxTokenTransfer from 'ui/tx/TxTokenTransfer';

const TransactionPageContent = () => {
  const router = useRouter();
  const appProps = useAppContext();

  const hash = getQueryParamString(router.query.hash);

  const { data, isPlaceholderData } = useApiQuery('tx', {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: TX,
    },
  });

  const tabs: Array<RoutedTab> = [
    { id: 'index', title: config.features.suave.isEnabled && data?.wrapped ? '加密交易详情' : '详情', component: <TxDetails/> },
    config.features.suave.isEnabled && data?.wrapped ?
      { id: 'wrapped', title: '普通交易详情', component: <TxDetailsWrapped data={ data.wrapped }/> } :
      undefined,
    { id: 'token_transfers', title: 'Token交易', component: <TxTokenTransfer/> },
    { id: 'internal', title: '内部交易', component: <TxInternals/> },
    { id: 'logs', title: '交易日志', component: <TxLogs/> },
    { id: 'state', title: '状态', component: <TxState/> },
    { id: 'raw_trace', title: '原始数据', component: <TxRawTrace/> },
  ].filter(Boolean);

  const tabIndex = useTabIndexFromQuery(tabs);

  const tags = (
    <EntityTags
      isLoading={ isPlaceholderData }
      tagsBefore={ [ data?.tx_tag ? { label: data.tx_tag, display_name: data.tx_tag } : undefined ] }
    />
  );

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.includes('/txs');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: '返回交易列表',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  const titleSecondRow = (
    <>
      <TxEntity hash={ hash } noLink noCopy={ false } fontWeight={ 500 } mr={ 2 } fontFamily="heading"/>
      { !data?.tx_tag && <AccountActionsMenu mr={{ base: 0, lg: 3 }}/> }
      <NetworkExplorers type="tx" pathParam={ hash } ml={{ base: 3, lg: 'auto' }}/>
    </>
  );

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title="交易详情"
        backLink={ backLink }
        contentAfter={ tags }
        secondRow={ titleSecondRow }
      />
      { isPlaceholderData ? (
        <>
          <TabsSkeleton tabs={ tabs } mt={ 6 }/>
          { tabs[tabIndex]?.component }
        </>
      ) : <RoutedTabs tabs={ tabs }/> }
    </>
  );
};

export default TransactionPageContent;
