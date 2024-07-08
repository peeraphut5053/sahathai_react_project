import { useQuery } from "react-query";
import API from "src/views/components/API";

const useGetTransType = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["transType"],
        queryFn: async () => {
            const response = await API.get(
                "RPT_JOBORDERPROCESSING/data.php",
                {
                    params: {
                        load: "GetTranstypeList",
                    },
                }
            );
            return response.data;
        },
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
    });
    return { data, isLoading, error };
}

export default useGetTransType;