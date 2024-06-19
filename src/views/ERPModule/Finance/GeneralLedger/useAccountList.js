import { useQuery } from "react-query";
import API from "src/views/components/API";

const useAccountList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["AccountList"],
        queryFn: async () => {
            const response = await API.get(
                "RPTGL/data.php",
                {
                    params: {
                        load: "list",
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

export default useAccountList;