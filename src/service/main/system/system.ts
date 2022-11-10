import zkRequest from '../../index';
import { IDataType } from '../../types';

export function getPageListData(url: string, queryInfo: any) {
  return zkRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

export function deletePageData(url: string) {
  return zkRequest.delete<IDataType>({
    url: url,
  });
}
