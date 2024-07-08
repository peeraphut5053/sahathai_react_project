import { useQuery } from "react-query";
import API from "src/views/components/API";

const useTruck= () => {
    const { data, isLoading, error,refetch } = useQuery({
        queryKey: ["TruckNote"],
        queryFn: async () => {
            const response = await API.get(
                "API_QuantityMove/data.php?load=STS_qty_move_hrd_Truck");
            return response.data;
        },
        staleTime: 60 * 5000,
        cacheTime: 60 * 5000
    });
    return { data, isLoading, error,refetch };
}

export default useTruck;