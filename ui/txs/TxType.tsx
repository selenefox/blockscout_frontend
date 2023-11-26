import React from 'react';

import type { TransactionType } from 'types/api/transaction';

import Tag from 'ui/shared/chakra/Tag';

export interface Props {
  types: Array<TransactionType>;
  isLoading?: boolean;
}

const TYPES_ORDER = [ 'rootstock_remasc', 'rootstock_bridge', 'token_creation', 'contract_creation', 'token_transfer', 'contract_call', 'coin_transfer' ];

const TxType = ({ types, isLoading }: Props) => {
  const typeToShow = types.sort((t1, t2) => TYPES_ORDER.indexOf(t1) - TYPES_ORDER.indexOf(t2))[0];

  let label;
  let colorScheme;

  switch (typeToShow) {
    case 'contract_call':
      label = '调取合约';
      colorScheme = 'blue';
      break;
    case 'contract_creation':
      label = '合约创建';
      colorScheme = 'blue';
      break;
    case 'token_transfer':
      label = 'Token转账';
      colorScheme = 'orange';
      break;
    case 'token_creation':
      label = '铸币';
      colorScheme = 'orange';
      break;
    case 'coin_transfer':
      label = 'RC转账';
      colorScheme = 'orange';
      break;
    case 'rootstock_remasc':
      label = 'REMASC';
      colorScheme = 'blue';
      break;
    case 'rootstock_bridge':
      label = 'Bridge';
      colorScheme = 'blue';
      break;
    default:
      label = '交易';
      colorScheme = 'purple';

  }

  return (
    <Tag colorScheme={ colorScheme } isLoading={ isLoading }>
      { label }
    </Tag>
  );
};

export default TxType;
