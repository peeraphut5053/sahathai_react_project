
import { useQuery } from "react-query";
import API from "src/views/components/API";

const useCustomer = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["Customer"],
        queryFn: async () => {
            const response = await API.get(
                "RPTCOLLECTION_DAY/data.php",
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

export default useCustomer;