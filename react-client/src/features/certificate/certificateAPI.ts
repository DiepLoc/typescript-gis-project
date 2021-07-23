import clientAxios from "../../common/utils/clientAxios"
import { Certificate, FetchAllData } from "./certificate.interface";

const baseUrl = "certificates";

const certificateAPI = {
  fetchAll : async (offset: number, loadMore: number) => {
    const { data } = await clientAxios.get(`${baseUrl}?offset=${offset}&pagesize=${loadMore}`);
    return data as FetchAllData;
  },
  fetchById : async (id: number) => {
    const { data } = await clientAxios.get(`${baseUrl}/${id}`);
    return data as Certificate;
  },
  fetchEdit : async (id: number, newData: Certificate) => {
    await clientAxios.put(`${baseUrl}/${id}`, {id, ...newData});
    return null;
  },
  fetchAdd : async (newData: Certificate) => {
    const { data } = await clientAxios.post(`${baseUrl}`, {...newData});
    return data as Certificate;
  },
  fetchDelete : async (id: number) => {
    await clientAxios.delete(`${baseUrl}/${id}`);
    return null;
  },
};

export default certificateAPI;

 