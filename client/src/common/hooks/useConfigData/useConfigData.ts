import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { ConfigType, ServiceType, ServiceStatus } from "../../../react-app-env";
import { getEnvironmentsConfig, getServiceHealthStatus } from "../../server/RestClient";

export const useConfigData = () => {

    const [config, setConfig] = useState<ConfigType>();

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
