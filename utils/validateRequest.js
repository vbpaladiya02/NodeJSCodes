exports.validateParamsWithJoi = async (payload, schemaKeys) => {
  try {
    const { error } = await schemaKeys.validateAsync(payload, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((el) => el.message).join(". ");
      return { error: message };
    }
    return true;
  } catch (error) {
    logger.error("Error - validateParamsWithJoi", error);
    return { error: error.message };
  }
};
