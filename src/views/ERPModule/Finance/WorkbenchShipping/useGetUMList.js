import { useQuery } from "react-query";
import API from "src/views/components/API";

const useGetUMList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["UMList"],
        queryFn: async () => {
            const response = await API.get(
                "RPT_JOBORDERPROCESSING/data.php",
                {
                    params: {
                        load: "GetUMList",
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

export default useGetUMList;