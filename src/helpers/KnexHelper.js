class KnexHelper {
  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   */
  addUpdatedAt(knex, tableBuilder, opts = {}) {
    const { fieldName = 'updated_at', convert = false } = opts;
    const dateRaw =
      // eslint-disable-next-line no-constant-condition
      false && convert
        ? `CONVERT_TZ(${knex.fn.now()}, 'GMT', 'America/Sao_Paulo')`
        : 'CURRENT_TIMESTAMP';

    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(knex.raw(`${dateRaw}`));
  }

  /**
   * @param {import('knex')} knex
   * @param {import('knex').TableBuilder} tableBuilder
   */
  addCreatedAt(knex, tableBuilder, opts = {}) {
    const { fieldName = 'created_at', convert = false } = opts;
    return tableBuilder
      .dateTime(fieldName)
      .notNullable()
      .defaultTo(
        // eslint-disable-next-line no-constant-condition
        false && convert
          ? knex.raw(`CONVERT_TZ(${knex.fn.now()}, 'GMT', 'America/Sao_Paulo')`)
          : knex.fn.now()
      );
  }
}

module.exports = KnexHelper;
