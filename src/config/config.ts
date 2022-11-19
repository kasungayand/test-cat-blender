import dotenv from "dotenv";
dotenv.config();

const environmentConfigs = process.env;

interface SERVER_ENV {
    NODE_ENV: string,
    PORT: string | number,
    BASEURL: string
}

const getServer = (): SERVER_ENV => {
  return {
    NODE_ENV: environmentConfigs.NODE_ENV || "local",
    PORT: environmentConfigs.SERVER_PORT || 3010,
    BASEURL: environmentConfigs.BASE_URL || "https://cataas.com/cat/says/",
  };
};

   
export default {
  SERVER: getServer(),
};