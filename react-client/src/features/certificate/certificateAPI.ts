import clientAxios from "../../common/utils/clientAxios"
import { Certificate, FetchAllData } from "./certificate.interface";

const baseUrl = "certificates";

export const fetchAll = async (offset: number, loadMore: number) => {
  const { data } = await clientAxios.get(`${baseUrl}?offset=${offset}&pagesize=${loadMore}`);
  return data as FetchAllData;
}

export const fetchById = async (id: number) => {
  const { data } = await clientAxios.get(`${baseUrl}/${id}`);
  return data as Certificate;
}

export const fetchEdit = async (id: number, newData: Certificate) => {
  await clientAxios.put(`${baseUrl}/${id}`, {id, ...newData});
  return null;
}

export const fetchAdd = async (newData: Certificate) => {
  const { data } = await clientAxios.post(`${baseUrl}`, {...newData});
  return data as Certificate;
}

export const fetchDelete = async (id: number) => {
  await clientAxios.delete(`${baseUrl}/${id}`);
  return null;
}