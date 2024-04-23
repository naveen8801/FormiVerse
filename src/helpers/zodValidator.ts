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
