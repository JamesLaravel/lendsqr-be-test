import database from "../config/database";

interface paramsDTO {
  [key: string]: any;
}

export default class Base {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected create = async (params: paramsDTO) => {
    return await database(this.tableName).insert(params);
  };

  protected findOne = async (
    condition: paramsDTO,
    returnValue: string | string[]
  ) => {
    return await database(this.tableName)
      .where(condition)
      .select(returnValue)
      .first();
  };

  protected findAll = async (
    condition: paramsDTO,
    returnValue: string | string[]
  ) => {
    return await database(this.tableName).where(condition).select(returnValue);
  };

  protected find = async (returnValue: string | string[]) => {
    return await database(this.tableName).select(returnValue);
  };

  public dbQuery = async () => {
    return await database(this.tableName);
  };
}
