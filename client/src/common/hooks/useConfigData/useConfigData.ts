import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { getEnvironmentsConfig, getServiceHealthStatus } from "../../server/RestClient";
import { Config } from "../../types/types";

export const useConfigData = () => {

    const [config, setConfig] = useState<Config>();

    const configQuery = useQuery(
        ['configQuery'],
        () => getEnvironmentsConfig(),
        { onSuccess: (data) => setConfig(config => data) }
    );

    return {
        config,
        isError: configQuery.isError,
        isLoading: configQuery.isLoading,
    };
}
