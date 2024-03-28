import { devConfig } from "./development.config";

const env = "development";

interface Config {
    API: {
        BASE_URL: string;
    };
}

const config: Record<string, Config> = {
    development: devConfig,
};

export default config[env];
