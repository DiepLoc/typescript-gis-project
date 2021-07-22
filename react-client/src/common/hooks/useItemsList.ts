import { useEffect, useState } from "react";
import { Type } from "typescript";

// const useItemsList = (fn: () => any) => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const reloadItems = async (newUrl) => {
//     const targetUrl = newUrl || url;
//     try {
//       setLoading(true);
//       const { data } = await clientAxios.get(targetUrl);
//       setRecords(data);
      

//       setLoading(false);
//       setError(null);
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     reloadItems();
//   }, [url]);

//   return [records, reloadItems, loading, error];
// };

// export default useItemsList;