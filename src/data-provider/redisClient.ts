import { REDIS_CONFIG } from "../config";

import { Tedis } from "tedis";

export const redis = new Tedis(REDIS_CONFIG);