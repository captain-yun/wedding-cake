import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '@/utils/case-converter';

export const createEnhancedClient = () => {
  const supabase = createClientComponentClient();

  return {
    ...supabase,
    from: (table) => ({
      ...supabase.from(table),
      select: async (...args) => {
        const { data, error } = await supabase.from(table).select(...args);
        return { data: data ? convertKeysToCamelCase(data) : null, error };
      },
      insert: async (values, ...args) => {
        const snakeCaseValues = convertKeysToSnakeCase(values);
        const { data, error } = await supabase.from(table).insert(snakeCaseValues, ...args);
        return { data: data ? convertKeysToCamelCase(data) : null, error };
      },
      upsert: async (values, ...args) => {
        const snakeCaseValues = convertKeysToSnakeCase(values);
        const { data, error } = await supabase.from(table).upsert(snakeCaseValues, ...args);
        return { data: data ? convertKeysToCamelCase(data) : null, error };
      },
      update: async (values, ...args) => {
        const snakeCaseValues = convertKeysToSnakeCase(values);
        const { data, error } = await supabase.from(table).update(snakeCaseValues, ...args);
        return { data: data ? convertKeysToCamelCase(data) : null, error };
      }
    })
  };
}; 