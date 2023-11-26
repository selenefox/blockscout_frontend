import { Alert, AlertDescription, chakra } from '@chakra-ui/react';
import React from 'react';

const DataFetchAlert = ({ className }: { className?: string }) => {
  return (
    <Alert status="warning" width="fit-content" className={ className }>
      <AlertDescription>
        出了些问题。 尝试刷新页面或稍后再回来。
      </AlertDescription>
    </Alert>
  );
};

export default chakra(DataFetchAlert);
