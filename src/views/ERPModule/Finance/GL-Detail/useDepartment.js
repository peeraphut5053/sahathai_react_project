import { useQuery } from "react-query";
import API from "src/views/components/API";

const useDepartments = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["Departments"],
        queryFn: async () => {
            const response = await API.get(
                "RPTGL_DETAIL/data.php",
                {
                    params: {
                        load: "department",
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

export default useDepartments;