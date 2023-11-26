import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import type { GasPrices } from 'types/api/stats';

const StatsGasPrices = ({ gasPrices }: {gasPrices: GasPrices}) => {
  const nameStyleProps = {
    color: useColorModeValue('blue.100', 'blue.600'),
  };

  return (
    <Grid templateColumns="repeat(2, max-content)" rowGap={ 2 } columnGap={ 4 } padding={ 4 } fontSize="xs">
      <GridItem { ...nameStyleProps }>慢</GridItem>
      <GridItem>{ `${ gasPrices.slow } Gwei` }</GridItem>
      <GridItem { ...nameStyleProps }>普通</GridItem>
      <GridItem>{ `${ gasPrices.average } Gwei` }</GridItem>
      <GridItem { ...nameStyleProps }>快</GridItem>
      <GridItem>{ `${ gasPrices.fast } Gwei` }</GridItem>
    </Grid>
  );
};

export default StatsGasPrices;
