import zkRequest from '../../index';
import { IDataType } from '../../types';

export function getPageListData(url: string, queryInfo: any) {
  return zkRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}
