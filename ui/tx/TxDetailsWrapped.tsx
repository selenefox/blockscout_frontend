import { Flex, Grid } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { Transaction } from 'types/api/transaction';
import type { ExcludeUndefined } from 'types/utils';

import config from 'configs/app';
import Tag from 'ui/shared/chakra/Tag';
import CurrencyValue from 'ui/shared/CurrencyValue';
import DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import RawInputData from 'ui/shared/RawInputData';
import TxDetailsGasPrice from 'ui/tx/details/TxDetailsGasPrice';
import TxDetailsOther from 'ui/tx/details/TxDetailsOther';

interface Props {
  data: ExcludeUndefined<Transaction['wrapped']>;
}

const TxDetailsWrapped = ({ data }: Props) => {
  return (
    <Grid columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <DetailsInfoItem
        title="交易HASH"
        hint="分配给每笔已验证交易的唯一字符串 (TxID)"
        flexWrap="nowrap"
      >
        <TxEntity hash={ data.hash } noIcon noLink noCopy={ false }/>
      </DetailsInfoItem>
      <DetailsInfoItem
        title="方法"
        hint="交易方法名称"
      >
        <Tag colorScheme="gray">
          { data.method }
        </Tag>
      </DetailsInfoItem>

      <DetailsInfoItemDivider/>

      <DetailsInfoItem
        title={ data.to?.is_contract ? 'Interacted with contract' : 'To' }
        hint="Address (external or contract) receiving the transaction"
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        columnGap={ 3 }
      >
        <Flex flexWrap="nowrap" alignItems="center" maxW="100%">
          <AddressEntity address={ data.to }/>
        </Flex>
      </DetailsInfoItem>

      <DetailsInfoItemDivider/>

      <DetailsInfoItem
        title="金额"
        hint="以本机代币（和美元）发送的值（如果适用）"
      >
        <CurrencyValue
          value={ data.value }
          currency={ config.chain.currency.symbol }
          flexWrap="wrap"
        />
      </DetailsInfoItem>
      <DetailsInfoItem
        title="手续费"
        hint="手续费总额"
      >
        <CurrencyValue
          value={ data.fee.value }
          currency={ config.chain.currency.symbol }
          flexWrap="wrap"
        />
      </DetailsInfoItem>
      <TxDetailsGasPrice gasPrice={ data.gas_price }/>
      { data.gas_limit && (
        <DetailsInfoItem
          title="Gas限制"
          hint="交易可使用的最大Gas量"
        >
          { BigNumber(data.gas_limit).toFormat() }
        </DetailsInfoItem>
      ) }

      <DetailsInfoItemDivider/>

      <TxDetailsOther type={ data.type } nonce={ data.nonce } position={ null }/>
      <DetailsInfoItem
        title="原始输入数据"
        hint="交易中包含的二进制数据。 请参阅日志选项卡以获取更多信息"
      >
        <RawInputData hex={ data.raw_input }/>
      </DetailsInfoItem>
      { data.decoded_input && (
        <DetailsInfoItem
          title="解码输入数据"
          hint="解码输入数据"
        >
          <LogDecodedInputData data={ data.decoded_input }/>
        </DetailsInfoItem>
      ) }
    </Grid>
  );
};

export default TxDetailsWrapped;
