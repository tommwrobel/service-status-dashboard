import { useState } from "react";
import { getEnvironmentsConfig } from "../../server/RestClient";
import { Config } from "../../types/types";
import { useQuery } from "@tanstack/react-query";

export const useConfigData = () => {
    const [config, setConfig] = useState<Config>();

    const configQuery = useQuery(
        ["configQuery"],
        () => getEnvironmentsConfig(),
        {
            onSuccess: (data) => setConfig((config) => data),
        }
    );

    return {
        config,
        isError: configQuery.isError,
        isLoading: configQuery.isLoading,
    };
};
