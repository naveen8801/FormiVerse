/**
 * Validates data against a Zod schema.
 *
 * @param {any} data - The data to validate.
 * @param {any} schema - The Zod schema to validate against.
 * @return {Promise<{ success: boolean; errors: any[] }>} The validation result indicating success and any errors.
 */

export const validateDataForZodSchema = async (
  data: any,
  schema: any
): Promise<{ success: boolean; errors: any[] }> => {
  try {
    const parseBody = await schema.parseAsync(data);
    return { success: true, errors: [] };
  } catch (err: any) {
    if (err?.issues && err?.issues?.length > 0)
      return { success: false, errors: err.issues };
    else {
      return { success: false, errors: [err?.toString()] };
    }
  }
};
