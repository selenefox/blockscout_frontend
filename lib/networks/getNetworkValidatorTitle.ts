import config from 'configs/app';

export default function getNetworkValidatorTitle() {
  return config.chain.verificationType === 'validation' ? '超级节点' : '矿工节点';
}
