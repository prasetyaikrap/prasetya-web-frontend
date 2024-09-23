import { z } from "zod";

import { formLoginSchema } from "./constant";

export type FormLoginFields = z.infer<typeof formLoginSchema>;
