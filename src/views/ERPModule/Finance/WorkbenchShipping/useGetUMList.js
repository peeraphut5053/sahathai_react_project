import axios from "axios";
import { useQuery } from "react-query";

const useGetUMList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["UMList"],
        queryFn: async () => {
            const response = await axios.get(
                "http://localhost/sts_web_center/module/RPT_JOBORDERPROCESSING/data.php",
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