import React from 'react';

import type { Transaction } from 'types/api/transaction';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: Transaction['status'];
  errorText?: string | null;
  isLoading?: boolean;
}

const TxStatus = ({ status, errorText, isLoading }: Props) => {
  let text;
  let type: StatusTagType;

  switch (status) {
    case 'ok':
      text = '成功';
      type = 'ok';
      break;
    case 'error':
      text = '失败';
      type = 'error';
      break;
    case null:
      text = '确认中';
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ text } errorText={ errorText } isLoading={ isLoading }/>;
};

export default TxStatus;
