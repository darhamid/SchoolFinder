import { Collection } from "mongodb";

export const fetch = (col: Collection, fetchOption: any): Promise<any> => {
  return new Promise((res, rej) => {
    col.findOne(fetchOption, (error: any, data: any) => {
      if (error) rej(error);
      res(data);
    });
  });
};

export const insert = (col: Collection, userObj: any) => {
  return new Promise((res, rej) => {
    col.insert(userObj, (error: any, user: any) => {
      if (error) rej(error);
      res(user);
    });
  });
};

export const fetchByQuery = (col: Collection, term: any) => {
  return new Promise((res, rej) => {
    if (term.projection) {
      col.findOne(term.query, { projection: term.projection }, (error: any, result: any) => {
        if (error) rej(error);
        res(result);
      });
    } else {
      col.findOne(term.query, (error: any, result: any) => {
        if (error) rej(error);
        res(result);
      });
    }
  });
};




