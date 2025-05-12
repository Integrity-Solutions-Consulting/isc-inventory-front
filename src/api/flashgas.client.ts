import { createClient } from '@geut/openapi-box';
import { schema } from '@/schemas/swagger.schema';

export const flashGasApiClient = createClient({
  schema,
  baseUrl: import.meta.env.VITE_API_URL,
});
